#!/usr/bin/env bash

set -euo pipefail

ENV_FILE="/var/www/www-root/data/www/tecai.ru/server/.env"
STATE_DIR="/var/lib/tecai/healthcheck"
STATUS_FILE="${STATE_DIR}/status"
LAST_ALERT_FILE="${STATE_DIR}/last_alert_ts"
LAST_OK_FILE="${STATE_DIR}/last_ok_ts"
TARGET_URL="https://tecai.ru/api/chat"
PAYLOAD='{"message":"healthcheck ping"}'
ALERT_COOLDOWN_SECONDS=1800

mkdir -p "${STATE_DIR}"

if [[ -f "${ENV_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
fi

send_telegram() {
  local message="$1"
  if [[ -z "${TELEGRAM_BOT_TOKEN:-}" || -z "${TELEGRAM_CHAT_ID:-}" ]]; then
    return 0
  fi

  curl -sS --max-time 15 \
    -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=${message}" \
    --data-urlencode "parse_mode=HTML" \
    >/dev/null || true
}

current_status="unknown"
if [[ -f "${STATUS_FILE}" ]]; then
  current_status="$(cat "${STATUS_FILE}")"
fi

response_file="$(mktemp)"
http_code="$(
  curl -sS -o "${response_file}" -w "%{http_code}" --max-time 20 \
    -X POST "${TARGET_URL}" \
    -H "Content-Type: application/json" \
    -d "${PAYLOAD}" || echo "000"
)"

response_body="$(cat "${response_file}")"
rm -f "${response_file}"

is_ok="false"
if [[ "${http_code}" == "200" ]] && [[ "${response_body}" == *"\"content\""* ]]; then
  is_ok="true"
fi

now_ts="$(date +%s)"
if [[ "${is_ok}" == "true" ]]; then
  echo "${now_ts}" > "${LAST_OK_FILE}"
  if [[ "${current_status}" != "up" ]]; then
    send_telegram "<b>tecai-backend восстановлен</b>
URL: ${TARGET_URL}
HTTP: ${http_code}"
  fi
  echo "up" > "${STATUS_FILE}"
  exit 0
fi

last_alert_ts=0
if [[ -f "${LAST_ALERT_FILE}" ]]; then
  last_alert_ts="$(cat "${LAST_ALERT_FILE}")"
fi

if (( now_ts - last_alert_ts >= ALERT_COOLDOWN_SECONDS )); then
  send_telegram "<b>tecai-backend недоступен</b>
URL: ${TARGET_URL}
HTTP: ${http_code}
Body: ${response_body:0:300}"
  echo "${now_ts}" > "${LAST_ALERT_FILE}"
fi

echo "down" > "${STATUS_FILE}"
exit 1

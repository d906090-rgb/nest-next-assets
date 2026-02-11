/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export class AudioController {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  lastPlayTime: { [key: string]: number } = {};

  constructor() {
    // Lazy initialization
  }

  init() {
    if (!this.ctx) {
      // Support for standard and webkit prefixed AudioContext
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.4; // Master volume
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playGemCollect() {
    const now = Date.now();
    if (now - (this.lastPlayTime['gem'] || 0) < 50) return; // Debounce 50ms
    this.lastPlayTime['gem'] = now;

    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(2000, t + 0.1);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    const dur = 0.15;
    osc.stop(t + dur);
    
    // Explicit cleanup
    osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
    };
    
    setTimeout(() => {
        if (osc) {
            try { osc.disconnect(); } catch(e) {}
        }
        if (gain) {
            try { gain.disconnect(); } catch(e) {}
        }
    }, (dur * 1000) + 200);
  }

  playLetterCollect() {
    const now = Date.now();
    if (now - (this.lastPlayTime['letter'] || 0) < 100) return; // Debounce 100ms
    this.lastPlayTime['letter'] = now;

    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99]; 
    
    freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = f;
        
        const start = t + (i * 0.04);
        const dur = 0.3;

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + dur);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        
        osc.start(start);
        osc.stop(start + dur);

        osc.onended = () => {
            osc.disconnect();
            gain.disconnect();
        };

        setTimeout(() => {
            try {
                osc.disconnect();
                gain.disconnect();
            } catch(e) {}
        }, ((start - t) + dur) * 1000 + 200);
    });
  }

  playJump(isDouble = false) {
    const now = Date.now();
    if (now - (this.lastPlayTime['jump'] || 0) < 100) return; 
    this.lastPlayTime['jump'] = now;

    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    const startFreq = isDouble ? 400 : 200;
    const endFreq = isDouble ? 800 : 450;

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.15);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    const dur = 0.15;
    osc.stop(t + dur);

    osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
    };

    setTimeout(() => {
        try {
            osc.disconnect();
            gain.disconnect();
        } catch(e) {}
    }, (dur * 1000) + 200);
  }

  playDamage() {
    const now = Date.now();
    if (now - (this.lastPlayTime['damage'] || 0) < 200) return; // Longer debounce for damage
    this.lastPlayTime['damage'] = now;

    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.3;
    
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.exponentialRampToValueAtTime(20, t + dur);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.6, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + dur);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    noise.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + dur);
    noise.start(t);
    noise.stop(t + dur);

    osc.onended = () => {
        osc.disconnect();
        oscGain.disconnect();
        noise.disconnect();
        noiseGain.disconnect();
    };

    setTimeout(() => {
        try {
            osc.disconnect();
            oscGain.disconnect();
            noise.disconnect();
            noiseGain.disconnect();
        } catch(e) {}
    }, (dur * 1000) + 200);
  }
}

export const audio = new AudioController();

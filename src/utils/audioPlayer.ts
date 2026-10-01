// Synthesizes atmospheric 1920s gramophone vinyl crackle and noir melody via Web Audio API

class NoirAmbientAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private melodyInterval: any = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  public start(): boolean {
    try {
      this.init();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) return true;

      // Master volume
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Vinyl Crackle Generator
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Random clicks and low frequency rumble
        const isClick = Math.random() < 0.003;
        output[i] = isClick ? (Math.random() * 2 - 1) * 0.7 : (Math.random() * 2 - 1) * 0.03;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Filter to simulate 1920s phonograph horn (bandpass 400Hz - 2400Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.noiseNode.connect(filter);
      filter.connect(this.masterGain);
      this.noiseNode.start();

      // 2. Vintage Piano / Brass Noir Chords
      const notes = [220, 261.63, 329.63, 392.00, 440, 311.13, 293.66, 246.94]; // A minor / bluesy
      let step = 0;

      this.melodyInterval = setInterval(() => {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;
        try {
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          const noteFilter = this.ctx.createBiquadFilter();

          osc.type = 'triangle';
          const freq = notes[step % notes.length];
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          noteFilter.type = 'lowpass';
          noteFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          noteGain.gain.setValueAtTime(0, now);
          noteGain.gain.linearRampToValueAtTime(0.04, now + 0.3);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

          osc.connect(noteFilter);
          noteFilter.connect(noteGain);
          noteGain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 2.6);
          step = (step + 1) % notes.length;
        } catch {
          // ignore transient notes
        }
      }, 2200);

      this.isPlaying = true;
      return true;
    } catch (e) {
      console.warn("Audio playback not permitted yet", e);
      return false;
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {}
      this.noiseNode = null;
    }
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const noirAudio = new NoirAmbientAudio();

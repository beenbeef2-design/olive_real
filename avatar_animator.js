/**
 * Olive Young AI Beauty Human - Avatar Animator (2.5D VTuber Edition)
 * Uses HTML5 Canvas 2D to animate static avatar images:
 * - Fixes face cropping using "object-fit: contain" scaling math.
 * - Simulates 2.5D VTuber (Live2D-like) motion by separating the head and body.
 * - Body: Stays upright, breathes subtly.
 * - Head (splitY): Rotates, drifts left/right, and breathes with larger amplitude.
 * - Eyes: Blink randomly, squeezing the eye area and smoothing the edge.
 * - Mouth: Moves with speaking state (Lip-sync) including dark oral cavity drawing.
 */

const AvatarAnimator = {
  canvas: null,
  ctx: null,
  activeImg: null,
  gender: 'female',
  isSpeaking: false,
  animationFrameId: null,
  
  // Coordinates are normalized percentages (0 to 1) of the image's natural dimensions
  config: {
    female: {
      eyeX: 0.5,
      eyeY: 0.33,
      eyeWidth: 0.28,
      eyeHeight: 0.05,
      mouthX: 0.5,
      mouthY: 0.46,
      mouthWidth: 0.16,
      mouthHeight: 0.06,
      splitY: 0.41,        // Neck dividing line
      breathSpeed: 1.5,
      breathRange: 5,      // Head breath amplitude (pixels)
      driftSpeed: 0.8,     // Head drift frequency
      driftRange: 0.012    // Tilt angle (rad)
    },
    male: {
      eyeX: 0.5,
      eyeY: 0.32,
      eyeWidth: 0.26,
      eyeHeight: 0.05,
      mouthX: 0.5,
      mouthY: 0.45,
      mouthWidth: 0.16,
      mouthHeight: 0.06,
      splitY: 0.40,        // Neck dividing line
      breathSpeed: 1.5,
      breathRange: 5,
      driftSpeed: 0.8,
      driftRange: 0.012
    }
  },

  state: {
    blinkProgress: 0,
    blinkDirection: 0,
    lastBlinkTime: 0,
    nextBlinkDelay: 3000,
    speakTimer: 0,
    speakScale: 1.0,
    calibrationMode: false
  },

  init(canvasId, femaleImgId, maleImgId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.femaleImg = document.getElementById(femaleImgId);
    this.maleImg = document.getElementById(maleImgId);
    
    // Load config from localStorage
    const savedConfig = localStorage.getItem('oy_avatar_calibration');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Merge saved config
        for (const g in parsed) {
          if (this.config[g]) {
            this.config[g] = { ...this.config[g], ...parsed[g] };
          }
        }
      } catch (e) {
        console.error("Failed to parse avatar calibration config:", e);
      }
    }

    this.updateActiveImage();
    this.setupResizeHandler();
    this.startLoop();
  },

  updateActiveImage() {
    this.activeImg = this.gender === 'female' ? this.femaleImg : this.maleImg;
    this.resizeCanvas();
  },

  setGender(gender) {
    if (this.gender !== gender) {
      this.gender = gender;
      this.updateActiveImage();
      this.triggerConfigUIUpdate();
    }
  },

  setSpeaking(speaking) {
    this.isSpeaking = speaking;
  },

  setCalibrationMode(enabled) {
    this.state.calibrationMode = enabled;
  },

  updateConfig(key, value) {
    const activeConf = this.config[this.gender];
    if (activeConf.hasOwnProperty(key)) {
      activeConf[key] = parseFloat(value);
      localStorage.setItem('oy_avatar_calibration', JSON.stringify(this.config));
    }
  },

  resetConfig() {
    const defaults = {
      female: {
        eyeX: 0.5,
        eyeY: 0.33,
        eyeWidth: 0.28,
        eyeHeight: 0.05,
        mouthX: 0.5,
        mouthY: 0.46,
        mouthWidth: 0.16,
        mouthHeight: 0.06,
        splitY: 0.41,
        breathSpeed: 1.5,
        breathRange: 5,
        driftSpeed: 0.8,
        driftRange: 0.012
      },
      male: {
        eyeX: 0.5,
        eyeY: 0.32,
        eyeWidth: 0.26,
        eyeHeight: 0.05,
        mouthX: 0.5,
        mouthY: 0.45,
        mouthWidth: 0.16,
        mouthHeight: 0.06,
        splitY: 0.40,
        breathSpeed: 1.5,
        breathRange: 5,
        driftSpeed: 0.8,
        driftRange: 0.012
      }
    };
    this.config = defaults;
    localStorage.removeItem('oy_avatar_calibration');
    this.triggerConfigUIUpdate();
  },

  setupResizeHandler() {
    window.addEventListener('resize', () => this.resizeCanvas());
  },

  resizeCanvas() {
    if (!this.canvas || !this.activeImg) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
  },

  startLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.state.lastBlinkTime = Date.now();
    this.state.nextBlinkDelay = 2000 + Math.random() * 3000;
    
    const loop = (timestamp) => {
      this.update(timestamp);
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  },

  update(timestamp) {
    const now = Date.now();

    // 1. Blink Animation State Machine
    if (this.state.blinkDirection === 0) {
      if (now - this.state.lastBlinkTime > this.state.nextBlinkDelay) {
        this.state.blinkDirection = 1;
      }
    } else if (this.state.blinkDirection === 1) {
      this.state.blinkProgress += 0.22; // Quick blink close
      if (this.state.blinkProgress >= 1.0) {
        this.state.blinkProgress = 1.0;
        this.state.blinkDirection = -1;
      }
    } else if (this.state.blinkDirection === -1) {
      this.state.blinkProgress -= 0.16; // Slightly slower open
      if (this.state.blinkProgress <= 0) {
        this.state.blinkProgress = 0;
        this.state.blinkDirection = 0;
        this.state.lastBlinkTime = now;
        this.state.nextBlinkDelay = 2500 + Math.random() * 4500;
      }
    }

    // 2. Speaking Lip-sync
    if (this.isSpeaking) {
      this.state.speakTimer += 0.28;
      const wave = Math.sin(this.state.speakTimer) * 0.38 + Math.sin(this.state.speakTimer * 2.1) * 0.18;
      this.state.speakScale = 1.0 + wave;
    } else {
      this.state.speakScale += (1.0 - this.state.speakScale) * 0.25;
    }
  },

  render() {
    if (!this.canvas || !this.ctx || !this.activeImg) return;
    if (this.activeImg.naturalWidth === 0) {
      this.activeImg.onload = () => {
        this.resizeCanvas();
      };
      return;
    }

    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    
    this.ctx.clearRect(0, 0, width, height);

    const imgW = this.activeImg.naturalWidth;
    const imgH = this.activeImg.naturalHeight;
    const activeConf = this.config[this.gender];

    // --- Object-fit Contain calculations ---
    const canvasRatio = width / height;
    const imgRatio = imgW / imgH;
    let drawW, drawH;
    
    if (imgRatio > canvasRatio) {
      drawW = width;
      drawH = width / imgRatio;
    } else {
      drawH = height * 0.98; // Leave a tiny bottom margin
      drawW = drawH * imgRatio;
    }
    
    const drawX = (width - drawW) / 2;
    const drawY = height - drawH; // Anchor bottom to bottom of canvas

    const time = Date.now() * 0.001;
    
    // --- 2.5D Calculations ---
    // Splitting Y coordinate on target drawing
    const splitRatio = activeConf.splitY;
    const splitS_Y = splitRatio * imgH;
    const splitD_Y = drawY + splitRatio * drawH;

    // Movement speeds and amplitudes
    const headBreath = Math.sin(time * activeConf.breathSpeed) * activeConf.breathRange;
    const bodyBreath = Math.sin(time * activeConf.breathSpeed) * (activeConf.breathRange * 0.4); // Body breathes less
    
    // Tilt angle (Z-rotation) & horizontal head translation (Parallax)
    const driftAngle = Math.sin(time * activeConf.driftSpeed) * activeConf.driftRange;
    const driftX = Math.sin(time * activeConf.driftSpeed * 1.3) * (activeConf.breathRange * 0.5);

    // ==========================================
    // LAYER 1: DRAW BODY (Static rotation, subtle breathing)
    // ==========================================
    this.ctx.save();
    
    // Source Body coordinates (Include tiny overlap to prevent gap)
    const sBodyY = Math.max(0, splitS_Y - imgH * 0.05);
    const sBodyH = imgH - sBodyY;
    const dBodyY = splitD_Y - drawH * 0.05 + bodyBreath;
    const dBodyH = drawH - (splitRatio - 0.05) * drawH;

    this.ctx.drawImage(
      this.activeImg,
      0, sBodyY, imgW, sBodyH,
      drawX, dBodyY, drawW, dBodyH
    );
    
    this.ctx.restore();

    // ==========================================
    // LAYER 2: DRAW HEAD (Tilt, drift, breathing & eyes/mouth)
    // ==========================================
    this.ctx.save();
    
    // Pivot point for head tilt/rotation (centered horizontally at neck joint)
    const pivotX = drawX + drawW * 0.5;
    const pivotY = splitD_Y;

    this.ctx.translate(pivotX, pivotY);
    this.ctx.rotate(driftAngle);
    this.ctx.translate(-pivotX, -pivotY);
    this.ctx.translate(driftX, headBreath);

    // Draw Head
    const sHeadH = splitS_Y;
    const dHeadH = splitRatio * drawH;
    
    this.ctx.drawImage(
      this.activeImg,
      0, 0, imgW, sHeadH,
      drawX, drawY, drawW, dHeadH
    );

    // --- Coordinates mapping inside transformed Head layer ---
    const sEyeX = (activeConf.eyeX - activeConf.eyeWidth / 2) * imgW;
    const sEyeY = (activeConf.eyeY - activeConf.eyeHeight / 2) * imgH;
    const sEyeW = activeConf.eyeWidth * imgW;
    const sEyeH = activeConf.eyeHeight * imgH;
    
    const sMouthX = (activeConf.mouthX - activeConf.mouthWidth / 2) * imgW;
    const sMouthY = (activeConf.mouthY - activeConf.mouthHeight / 2) * imgH;
    const sMouthW = activeConf.mouthWidth * imgW;
    const sMouthH = activeConf.mouthHeight * imgH;

    const dEyeX = drawX + (activeConf.eyeX - activeConf.eyeWidth / 2) * drawW;
    const dEyeY = drawY + (activeConf.eyeY - activeConf.eyeHeight / 2) * drawH;
    const dEyeW = activeConf.eyeWidth * drawW;
    const dEyeH = activeConf.eyeHeight * drawH;
    
    const dMouthX = drawX + (activeConf.mouthX - activeConf.mouthWidth / 2) * drawW;
    const dMouthY = drawY + (activeConf.mouthY - activeConf.mouthHeight / 2) * drawH;
    const dMouthW = activeConf.mouthWidth * drawW;
    const dMouthH = activeConf.mouthHeight * drawH;

    // --- EYE BLINK OVERLAY ---
    if (this.state.blinkProgress > 0) {
      // Crop skin right above eye box
      const sSkinY = Math.max(0, sEyeY - sEyeH * 0.5);
      const sSkinH = sEyeH * 0.5;
      
      // Paint skin over the eyes
      this.ctx.drawImage(
        this.activeImg,
        sEyeX, sSkinY, sEyeW, sSkinH,
        dEyeX, dEyeY, dEyeW, dEyeH
      );
      
      // Render squeezed eye on top
      const squeezedH = dEyeH * (1.0 - this.state.blinkProgress * 0.95); // Don't squeeze to absolute 0 to avoid artifacts
      const squeezedY = dEyeY + (dEyeH - squeezedH) / 2;
      
      this.ctx.drawImage(
        this.activeImg,
        sEyeX, sEyeY, sEyeW, sEyeH,
        dEyeX, squeezedY, dEyeW, squeezedH
      );

      // Eyelid line for closed state
      if (this.state.blinkProgress > 0.8) {
        this.ctx.strokeStyle = 'rgba(65, 45, 40, 0.4)';
        this.ctx.lineWidth = 1.6;
        this.ctx.beginPath();
        // Left eye lid crease
        this.ctx.moveTo(dEyeX + dEyeW * 0.1, dEyeY + dEyeH / 2);
        this.ctx.bezierCurveTo(
          dEyeX + dEyeW * 0.2, dEyeY + dEyeH / 2 + 1.2,
          dEyeX + dEyeW * 0.35, dEyeY + dEyeH / 2 + 1.2,
          dEyeX + dEyeW * 0.45, dEyeY + dEyeH / 2
        );
        // Right eye lid crease
        this.ctx.moveTo(dEyeX + dEyeW * 0.55, dEyeY + dEyeH / 2);
        this.ctx.bezierCurveTo(
          dEyeX + dEyeW * 0.65, dEyeY + dEyeH / 2 + 1.2,
          dEyeX + dEyeW * 0.8, dEyeY + dEyeH / 2 + 1.2,
          dEyeX + dEyeW * 0.9, dEyeY + dEyeH / 2
        );
        this.ctx.stroke();
      }
    }

    // --- MOUTH LIP-SYNC ---
    if (Math.abs(this.state.speakScale - 1.0) > 0.01) {
      // Cover mouth with skin from above top lip
      const sSkinY = Math.max(0, sMouthY - sMouthH * 0.4);
      const sSkinH = sMouthH * 0.4;
      
      this.ctx.drawImage(
        this.activeImg,
        sMouthX, sSkinY, sMouthW, sSkinH,
        dMouthX, dMouthY, dMouthW, dMouthH
      );

      const mouthScaleY = this.state.speakScale;
      const dMouthH_scaled = dMouthH * mouthScaleY;
      const dMouthY_scaled = dMouthY + (dMouthH - dMouthH_scaled) / 2;
      
      // Draw mouth cavity behind scaled lips
      if (mouthScaleY > 1.04) {
        const cavityW = dMouthW * 0.72;
        const cavityH = dMouthH_scaled * 0.38;
        const cavityX = dMouthX + (dMouthW - cavityW) / 2;
        const cavityY = dMouthY_scaled + (dMouthH_scaled - cavityH) / 2;
        
        this.ctx.fillStyle = 'rgba(50, 16, 16, 0.82)'; // Deep reddish dark oral cavity
        this.ctx.beginPath();
        this.ctx.ellipse(cavityX + cavityW/2, cavityY + cavityH/2, cavityW/2, cavityH/2, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.drawImage(
        this.activeImg,
        sMouthX, sMouthY, sMouthW, sMouthH,
        dMouthX, dMouthY_scaled, dMouthW, dMouthH_scaled
      );
    }

    // --- CALIBRATION MODE OVERLAYS ---
    if (this.state.calibrationMode) {
      // Split line (Neck dividing line)
      this.ctx.strokeStyle = 'rgba(0, 255, 100, 0.8)'; // Green for neck split
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([6, 4]);
      this.ctx.beginPath();
      this.ctx.moveTo(drawX, splitD_Y);
      this.ctx.lineTo(drawX + drawW, splitD_Y);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
      
      this.ctx.fillStyle = '#00ff64';
      this.ctx.font = '10px monospace';
      this.ctx.fillText('NECK JOINT (splitY)', drawX + 10, splitD_Y - 5);

      // Eye Box
      this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.75)';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(dEyeX, dEyeY, dEyeW, dEyeH);
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.08)';
      this.ctx.fillRect(dEyeX, dEyeY, dEyeW, dEyeH);
      this.ctx.fillStyle = '#ff0000';
      this.ctx.fillText('EYE TARGET', dEyeX, dEyeY - 4);

      // Mouth Box
      this.ctx.strokeStyle = 'rgba(0, 150, 255, 0.75)';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(dMouthX, dMouthY, dMouthW, dMouthH);
      this.ctx.fillStyle = 'rgba(0, 150, 255, 0.08)';
      this.ctx.fillRect(dMouthX, dMouthY, dMouthW, dMouthH);
      this.ctx.fillStyle = '#0096ff';
      this.ctx.fillText('MOUTH TARGET', dMouthX, dMouthY - 4);
    }
    
    this.ctx.restore();
  },

  triggerConfigUIUpdate() {
    const activeConf = this.config[this.gender];
    for (const key in activeConf) {
      const el = document.getElementById(`cal-${key}`);
      const valEl = document.getElementById(`val-${key}`);
      if (el) {
        el.value = activeConf[key];
      }
      if (valEl) {
        valEl.textContent = activeConf[key].toFixed(key.includes('Speed') || key.includes('Range') || key.includes('Angle') ? 2 : 3);
      }
    }
  }
};

window.AvatarAnimator = AvatarAnimator;

# 🔊 Sound Effects & Audio System

## Overview
ChessVerse features a comprehensive audio system with **sound effects** and **AI voice narration** to create an immersive cyberpunk learning experience.

## 🎵 Sound Effects Library

### Core Sound Effects

#### 1. **Success Sound** ✅
- **Trigger**: Correct code submission
- **Source**: Freesound.org
- **Volume**: 0.6
- **Purpose**: Celebrate successful puzzle completion
- **File**: `171671_2437358-lq.mp3`

#### 2. **Error Sound** ❌
- **Trigger**: Incorrect code submission
- **Source**: Freesound.org
- **Volume**: 0.5
- **Purpose**: Gentle feedback for mistakes
- **File**: `331912_5121236-lq.mp3`

#### 3. **Move/Click Sound** 🎯
- **Trigger**: Navigation, button clicks, piece moves
- **Source**: Freesound.org
- **Volume**: 0.4
- **Purpose**: UI interaction feedback
- **File**: `254316_4062622-lq.mp3`

#### 4. **Level Up Sound** ⭐
- **Trigger**: Gaining a level, major achievements
- **Source**: Freesound.org
- **Volume**: 0.7
- **Purpose**: Reward progression milestones
- **File**: `270319_5123851-lq.mp3`

### Chess Piece Sounds ♟️

Each chess piece has a unique sound for interactive demonstrations:

#### 5. **Pawn Sound** ♟
- **Volume**: 0.5
- **File**: `536450_11861866-lq.mp3`
- **Character**: Light, quick tone

#### 6. **Knight Sound** ♞
- **Volume**: 0.5
- **File**: `442943_5121236-lq.mp3`
- **Character**: Sharp, distinctive

#### 7. **Bishop Sound** ♗
- **Volume**: 0.5
- **File**: `156859_2538033-lq.mp3`
- **Character**: Smooth, flowing

#### 8. **Rook Sound** ♜
- **Volume**: 0.5
- **File**: `270333_5123851-lq.mp3`
- **Character**: Strong, solid

#### 9. **Queen Sound** ♛
- **Volume**: 0.6
- **File**: `320181_5260872-lq.mp3`
- **Character**: Powerful, majestic

#### 10. **King Sound** ♚
- **Volume**: 0.6
- **File**: `274765_5123851-lq.mp3`
- **Character**: Royal, important

## 🎙️ Voice Narration System

### Indian Accent TTS (Text-to-Speech)
- **Technology**: Web Speech API (SpeechSynthesis)
- **Accent**: Indian English (en-IN)
- **Rate**: 0.9 (slower for clarity)
- **Pitch**: 1.1 (higher for Indian accent)
- **Volume**: 0.8

### Narration Contexts

#### Teaching Moments
- Lesson introductions with analogy
- Chess piece descriptions
- Success and error feedback
- Hint explanations

#### Navigation
- Screen transitions
- Piece navigation (next/previous)
- Tutorial completions

## 🎛️ Audio Controls

### Mute Toggle
- **Location**: Dashboard header (🔊 / 🔇 icon)
- **Affects**: Sound effects only
- **Does NOT affect**: Voice narration (separate control)

### Narration Toggle
- **Location**: Top-right corner (🎙️ / 🔇 icon)
- **Affects**: Voice narration only
- **Does NOT affect**: Sound effects

### Independent Control
- Sound effects and narration work independently
- Users can mix and match preferences:
  - ✅ Sound effects ON + Narration ON (full experience)
  - ✅ Sound effects ON + Narration OFF (quiet learning)
  - ✅ Sound effects OFF + Narration ON (voice-guided)
  - ✅ Both OFF (silent mode)

## 🔄 Audio Lifecycle

### Initialization
```javascript
useEffect(() => {
  // Audio refs initialized on mount
  // Sources loaded from Freesound.org CDN
  // No autoplay (browser policy compliant)
}, []);
```

### Playback Pattern
```javascript
// Sound effects
soundRef.current.currentTime = 0; // Reset to start
soundRef.current.play().catch(handleError);

// Voice narration
const utterance = new SpeechSynthesisUtterance(text);
// Configure voice, rate, pitch
synth.speak(utterance);
```

### Error Handling
- Catches audio play failures (autoplay policy)
- Logs errors without breaking UI
- Graceful degradation if audio unavailable

## 📊 Audio States

### `isMuted`
- Controls sound effects
- Stored in component state
- Does not persist across sessions
- Defaults to `true` (user must enable)

### `narrationEnabled`
- Controls voice narration
- Stored in component state
- Defaults to `true`
- Independent from `isMuted`

### `isNarrating`
- Indicates active narration
- Updates UI (🔊 icon when active)
- Automatically managed by speech events

### `audioInitialized`
- Tracks user interaction requirement
- Browser autoplay policies require user gesture
- Set to `true` after first button click

## 🎨 UI Indicators

### Sound Effect State
- **Active**: 🔊 Volume2 icon (white/visible)
- **Muted**: 🔇 VolumeX icon (gray)
- **Location**: Dashboard header button

### Narration State
- **Enabled & Idle**: 🎙️ Microphone (pink/active)
- **Currently Speaking**: 🔊 Speaker (pink/animated)
- **Disabled**: 🔇 Muted (gray/inactive)
- **Location**: Top-right language selector bar

## 🌐 Browser Compatibility

### Sound Effects
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Requires HTTPS or localhost
- ⚠️ Subject to autoplay policies

### Voice Narration
- ✅ Chrome/Edge: Excellent (Indian voices available)
- ✅ Firefox: Good (voice selection limited)
- ⚠️ Safari: Basic (fewer voice options)
- ❌ IE11: Not supported

## 📱 Mobile Considerations

### Touch Interaction
- First touch enables audio context
- Sound effects work after user gesture
- Voice narration may require additional permissions

### Volume Control
- Respects system volume settings
- Media volume (not ringer volume)
- Recommended: Test with headphones

### Battery Impact
- Voice narration can drain battery faster
- Users can disable for longer sessions
- Sound effects have minimal impact

## 🚀 Performance

### Audio Loading
- Lazy loaded from CDN
- Cached by browser after first play
- No preloading (save bandwidth)

### Memory Usage
- Audio refs persist across renders
- Minimal memory footprint
- Old utterances garbage collected

### Playback Latency
- Sound effects: < 50ms
- Voice narration: ~100-300ms (synthesis time)

## 🔧 Troubleshooting

### No Sound?
1. Check browser audio permissions
2. Verify system volume is up
3. Test with different browsers
4. Enable sounds via UI toggle
5. Click anywhere to initialize audio context

### Robotic Voice?
- Browser TTS quality varies
- Try different browsers for better voices
- Chrome/Edge recommended for Indian accent

### Audio Cutting Out?
- Check internet connection (CDN hosted)
- Browser resource limitations
- Too many tabs open

## 🎯 Best Practices

### For Users
- Enable audio after first interaction
- Use headphones for best experience
- Adjust system volume, not app volume
- Disable narration if multitasking

### For Developers
- Always catch audio play promises
- Reset `currentTime` before replay
- Handle speech synthesis errors
- Test across multiple browsers

---

**Audio-Visual Learning Experience by ChessVerse 🎮🔊**

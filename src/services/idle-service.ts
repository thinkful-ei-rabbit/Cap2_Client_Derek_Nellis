const _FIVE_MINUTES = 5 * 60 * 1e3;
const _notIdleEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
] as const;
let _timeoutId: NodeJS.Timeout;
let _idleCallback: () => void;

const IdleService = {
  setIdleCallback(idleCallback: () => void): void {
    _idleCallback = idleCallback;
  },

  resetIdleTimer(): void {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES);
  },

  regiserIdleTimerResets(): void {
    _notIdleEvents.forEach((event) =>
      document.addEventListener(
        event,
        IdleService.resetIdleTimer,
        true,
      ),
    );
  },

  unRegisterIdleResets(): void {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach((event) =>
      document.removeEventListener(
        event,
        IdleService.resetIdleTimer,
        true,
      ),
    );
  },
};

export default IdleService;

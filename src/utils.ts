export function canUseDOM() {
  return (
    typeof window !== "undefined" &&
    !!window.document &&
    !!window.document.createElement
  );
}

export function canUseEventListeners() {
  return canUseDOM() && !!window.addEventListener;
}

export function canUseViewport() {
  return canUseDOM() && !!window.screen;
}

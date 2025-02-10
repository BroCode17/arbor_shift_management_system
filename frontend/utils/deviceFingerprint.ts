export const getDeviceFingerprint = async (): Promise<string> => {
  try {
    const components = [
      navigator.userAgent,
      navigator.language,
      new Date().getTimezoneOffset(),
      screen.height,
      screen.width,
      screen.colorDepth,
    ];

    // Use available hardware info if possible
    if (navigator.deviceMemory) components.push(navigator.deviceMemory);
    if (navigator.hardwareConcurrency) components.push(navigator.hardwareConcurrency);

    const fingerprint = components.join('|');
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fingerprint));
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    return `fallback-${Date.now()}-${Math.random()}`;
  }
};
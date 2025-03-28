/**
 * Preloads a YouTube video thumbnail to improve perceived loading speed
 * @param videoId YouTube video ID
 * @returns Promise that resolves when the thumbnail is loaded
 */
export function preloadYouTubeThumbnail(videoId: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve() // Resolve anyway to avoid blocking
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  })
}

/**
 * Tests if autoplay is supported in the current browser
 * @returns Promise that resolves to true if autoplay is supported, false otherwise
 */
export async function testAutoplaySupport(): Promise<boolean> {
  try {
    const video = document.createElement("video")
    video.muted = true
    video.setAttribute("playsinline", "")
    video.setAttribute("webkit-playsinline", "")

    // Use a tiny video source
    video.src =
      "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0AAACrQYF//+13EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAwZYiEAD//8m+P5OXfBeLGOfKE3xQxyLmiMnhDymIeQkL9H9KIKkAAALACAAAAQ2WIhAA//8m+P5OXfBeLGOfKE3xQxyLmiMnhDymIeQkL9H9KIKY="

    // Try to play
    const playResult = video.play()

    if (playResult !== undefined) {
      return playResult
        .then(() => {
          // Successfully played
          video.pause()
          return true
        })
        .catch(() => {
          // Autoplay was prevented
          return false
        })
    } else {
      // Old browsers might not return a promise
      return new Promise((resolve) => {
        // Set a timeout to check if video started playing
        setTimeout(() => {
          if (!video.paused) {
            video.pause()
            resolve(true)
          } else {
            resolve(false)
          }
        }, 50)
      })
    }
  } catch (error) {
    // If any error occurs, assume autoplay is not supported
    return false
  }
}


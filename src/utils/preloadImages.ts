function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image()
    const finish = () => {
      const decoding = image.decode?.()
      if (!decoding) {
        resolve()
        return
      }
      decoding.then(
        () => resolve(),
        () => resolve(),
      )
    }
    image.onload = finish
    image.onerror = () => resolve()
    image.src = src
    if (image.complete) finish()
  })
}

/** Resolves when every image has loaded or failed, so one missing file cannot hold the screen. */
export function whenImagesReady(sources: readonly string[]): Promise<void> {
  if (sources.length === 0) return Promise.resolve()
  return Promise.all(sources.map(loadImage)).then(() => undefined)
}

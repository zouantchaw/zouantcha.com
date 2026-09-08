'use client'

import { useRef, useState } from 'react'

export function InteractionFilm({ src, poster, caption, description }: {src: string; poster: string; caption: string; description: string}) {
  const video = useRef<HTMLVideoElement>(null)
  const [slow, setSlow] = useState(false)
  return (
    <figure className="interaction-film">
      <div className="interaction-film-stage">
        <video ref={video} controls playsInline preload="none" poster={poster} aria-label={caption}>
          <source src={src} type="video/mp4" />
          <a href={src}>Download this interaction</a>
        </video>
        <button type="button" className="film-speed" aria-pressed={slow} aria-label="Play at half speed" onClick={() => {
          if (video.current) video.current.playbackRate = slow ? 1 : 0.5
          setSlow(!slow)
        }}>{slow ? '0.5×' : '1×'}</button>
      </div>
      <figcaption>
        <p>{caption}</p>
        <details><summary>Visual description</summary><p>{description}</p></details>
      </figcaption>
    </figure>
  )
}

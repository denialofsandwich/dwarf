import React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={props.width}
      height={props.width}
      {...props}
    >
      <defs>
        <pattern
          id="Pattern"
          x="0"
          y="0"
          patternUnits="userSpaceOnUse"
          width={props.scale*1080}
          height={props.scale*900}
          viewBox="0 0 1080 900"
        >
          <path fill={props.backgroundcolor} d="M0 0h1080v900H0z" />
          <g fillOpacity={props.contrast}>
            <path fill="#444" d="M90 150L0 300h180z" />
            <path d="M90 150L180 0H0z" />
            <path fill="#AAA" d="M270 150L360 0H180z" />
            <path fill="#DDD" d="M450 150l-90 150h180z" />
            <path fill="#999" d="M450 150L540 0H360z" />
            <path d="M630 150l-90 150h180z" />
            <path fill="#DDD" d="M630 150L720 0H540z" />
            <path fill="#444" d="M810 150l-90 150h180z" />
            <path fill="#FFF" d="M810 150L900 0H720z" />
            <path fill="#DDD" d="M990 150l-90 150h180z" />
            <path fill="#444" d="M990 150l90-150H900z" />
            <path fill="#DDD" d="M90 450L0 600h180z" />
            <path d="M90 450l90-150H0z" />
            <path fill="#666" d="M270 450l-90 150h180z" />
            <path fill="#AAA" d="M270 450l90-150H180z" />
            <path fill="#DDD" d="M450 450l-90 150h180z" />
            <path fill="#999" d="M450 450l90-150H360zM630 450l-90 150h180z" />
            <path fill="#FFF" d="M630 450l90-150H540z" />
            <path d="M810 450l-90 150h180z" />
            <path fill="#DDD" d="M810 450l90-150H720z" />
            <path fill="#AAA" d="M990 450l-90 150h180z" />
            <path fill="#444" d="M990 450l90-150H900z" />
            <path fill="#222" d="M90 750L0 900h180z" />
            <path d="M270 750l-90 150h180z" />
            <path fill="#DDD" d="M270 750l90-150H180z" />
            <path d="M450 750l90-150H360zM630 750l-90 150h180z" />
            <path fill="#444" d="M630 750l90-150H540z" />
            <path fill="#AAA" d="M810 750l-90 150h180z" />
            <path fill="#666" d="M810 750l90-150H720z" />
            <path fill="#999" d="M990 750l-90 150h180zM180 0L90 150h180z" />
            <path fill="#444" d="M360 0l-90 150h180z" />
            <path fill="#FFF" d="M540 0l-90 150h180z" />
            <path d="M900 0l-90 150h180z" />
            <path fill="#222" d="M0 300l-90 150H90z" />
            <path fill="#FFF" d="M0 300l90-150H-90zM180 300L90 450h180z" />
            <path fill="#666" d="M180 300l90-150H90z" />
            <path fill="#222" d="M360 300l-90 150h180z" />
            <path fill="#FFF" d="M360 300l90-150H270z" />
            <path fill="#444" d="M540 300l-90 150h180z" />
            <path fill="#222" d="M540 300l90-150H450z" />
            <path fill="#AAA" d="M720 300l-90 150h180z" />
            <path fill="#666" d="M720 300l90-150H630z" />
            <path fill="#FFF" d="M900 300l-90 150h180z" />
            <path fill="#999" d="M900 300l90-150H810z" />
            <path d="M0 600l-90 150H90z" />
            <path fill="#666" d="M0 600l90-150H-90z" />
            <path fill="#AAA" d="M180 600L90 750h180z" />
            <path fill="#444" d="M180 600l90-150H90zM360 600l-90 150h180z" />
            <path fill="#999" d="M360 600l90-150H270z" />
            <path fill="#666" d="M540 600l90-150H450z" />
            <path fill="#222" d="M720 600l-90 150h180z" />
            <path fill="#FFF" d="M900 600l-90 150h180z" />
            <path fill="#222" d="M900 600l90-150H810z" />
            <path fill="#DDD" d="M0 900l90-150H-90z" />
            <path fill="#444" d="M180 900l90-150H90z" />
            <path fill="#FFF" d="M360 900l90-150H270z" />
            <path fill="#AAA" d="M540 900l90-150H450z" />
            <path fill="#FFF" d="M720 900l90-150H630z" />
            <path fill="#222" d="M900 900l90-150H810zM1080 300l-90 150h180z" />
            <path fill="#FFF" d="M1080 300l90-150H990z" />
            <path d="M1080 600l-90 150h180z" />
            <path fill="#666" d="M1080 600l90-150H990z" />
            <path fill="#DDD" d="M1080 900l90-150H990z" />
          </g>
        </pattern>
      </defs>
      <rect fill="url(#Pattern)" width="100%" height="100%"/>
    </svg>
  )
}

SvgComponent.defaultProps = {
  width: 600,
  height: 400,
  scale: 1,
  backgroundcolor: '#ffb42b',
  contrast: 0.09,
}

export default SvgComponent

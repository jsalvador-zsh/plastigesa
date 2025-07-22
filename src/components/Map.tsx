'use client'

import { useEffect, useRef } from 'react'

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!mapRef.current) return

      // Evita múltiples inicializaciones
      if ((window as any).L && mapRef.current.dataset.initialized) return

      // Marca como inicializado
      mapRef.current.dataset.initialized = 'true'

      // Cargar CSS
      const leafletCssId = 'leaflet-css'
      if (!document.getElementById(leafletCssId)) {
        const link = document.createElement('link')
        link.id = leafletCssId
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Cargar script JS
      const leafletJsId = 'leaflet-js'
      if (!document.getElementById(leafletJsId)) {
        const script = document.createElement('script')
        script.id = leafletJsId
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
        script.onload = initializeMap
        document.body.appendChild(script)
      } else {
        initializeMap()
      }
    }

    const initializeMap = () => {
      const L = (window as any).L
      if (!L || !mapRef.current) return

      const map = L.map(mapRef.current).setView([-16.4054279, -71.5128487], 17)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      L.marker([-16.4054279, -71.5128487], { icon })
        .addTo(map)
        .bindPopup('Plastigesa E.I.R.L.')
        .openPopup()
    }

    loadLeaflet()
  }, [])

  return (
    <div
      ref={mapRef}
      id="map"
      className="h-72 lg:h-[400px] w-full rounded-md shadow-md"
    />
  )
}

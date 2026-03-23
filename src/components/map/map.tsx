import L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

import defaultPin from '../../../markup/img/pin.svg';
import activePin from '../../../markup/img/pin-active.svg';

import { City, OfferType } from '../../types/offers';

type MapProps = {
  city: City;
  points: OfferType[];
  selectedOfferId?: string;
};

function Map({ city, points, selectedOfferId }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    } else {
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    points.forEach((offer) => {
      const isActive = selectedOfferId === offer.id;

      const icon = L.icon({
        iconUrl: isActive ? activePin : defaultPin,
        iconSize: [27, 39],
        iconAnchor: [13, 39],
      });

      const marker = L.marker([offer.location.latitude, offer.location.longitude], { icon });

      marker.addTo(markersLayerRef.current!);
    });
  }, [city.location.latitude, city.location.longitude, city.location.zoom, points, selectedOfferId]);

  return <section className="cities__map map" ref={mapRef} style={{ height: '100%', minHeight: '500px', width: '100%' }} />;
}

export default Map;

"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, LayersControl, ScaleControl, FeatureGroup, WMSTileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const satelliteLayers = {
  sentinel2: {
    name: "Sentinel-2",
    url: "https://services.sentinel-hub.com/ogc/wmts/sentinel-2-l2a/{z}/{x}/{y}.png",
    attribution: "Contains modified Copernicus Sentinel data"
  },
  landsat8: {
    name: "Landsat 8",
    url: "https://landsat-pds.s3.amazonaws.com/c1/L8//{z}/{x}/{y}.png",
    attribution: "USGS/NASA Landsat"
  },
  modis: {
    name: "MODIS Terra",
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/{z}/{y}/{x}.jpg",
    attribution: "NASA EOSDIS GIBS"
  },
  esriWorldImagery: {
    name: "ESRI World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
};

// Add WMS layers configuration
const wmsLayers = {
  rgb: {
    name: "RGB",
    layers: "maxar-poc:rgb",
    styles: "rgb"
  },
  falseColor: {
    name: "False Color",
    layers: "maxar-poc:false-color",
    styles: "false-color"
  },
  ndvi: {
    name: "NDVI",
    layers: "maxar-poc:ndvi",
    styles: "ndvi"
  }
};

const Map = () => {
  const [mounted, setMounted] = useState(false);
  const [drawnItems, setDrawnItems] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    if (drawnItems) {
      drawnItems.addLayer(layer);
    }
  };

  if (!mounted) return null;

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      className="w-full h-full relative"
      style={{ height: '100%', background: '#f8f9fa', zIndex: 0 }}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        
        {Object.entries(satelliteLayers).map(([key, layer]) => (
          <LayersControl.BaseLayer key={key} name={layer.name}>
            <TileLayer
              url={layer.url}
              attribution={layer.attribution}
            />
          </LayersControl.BaseLayer>
        ))}

        {/* Add WMS Overlay Layers */}
        {Object.entries(wmsLayers).map(([key, layer]) => (
          <LayersControl.Overlay key={key} name={layer.name}>
            <WMSTileLayer
              url="http://localhost:8080/geoserver/maxar-poc/wms"
              layers={layer.layers}
              styles={layer.styles}
              format='image/png'
              transparent={true}
              version='1.1.0'
              attribution="Local GeoServer"
              opacity={0.7}
            />
          </LayersControl.Overlay>
        ))}
      </LayersControl>

      <FeatureGroup ref={(featureGroupRef) => setDrawnItems(featureGroupRef)}>
        <EditControl
          position="topleft"
          onCreated={handleCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>

      <ScaleControl position="bottomleft" />
    </MapContainer>
  );
};

export default Map;
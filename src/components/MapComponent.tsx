import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Draw, Modify, Snap } from "ol/interaction";
import { Style, Stroke, Fill } from "ol/style";

interface MapComponentProps {
  firstName: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ firstName }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const vectorSourceRef = useRef<VectorSource>(new VectorSource());

  useEffect(() => {
    if (!mapRef.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const draw = new Draw({
      source: vectorSourceRef.current,
      type: "Polygon",
    });
    map.addInteraction(draw);

    const modify = new Modify({
      source: vectorSourceRef.current,
    });
    map.addInteraction(modify);

    const snap = new Snap({
      source: vectorSourceRef.current,
    });
    map.addInteraction(snap);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  const handleDelete = () => {
    vectorSourceRef.current.clear();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Hello, {firstName}
      </h1>
      <div ref={mapRef} style={{ width: "200vh", height: "500px" }}></div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handleDelete}>Delete All Polygons</button>
      </div>
    </div>
  );
};

export default MapComponent;

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileProcessResult } from "./file-image-processor.service";


declare const mapboxgl: any;
declare const turf: any;

@Injectable()
export class FileMapProcessorService {

    public processMapFilePromise(uploadedFile: File): Promise<FileProcessResult> {
        return this.processMapFile(uploadedFile).toPromise();
    }

    public processMapFile(uploadedFile: File): Observable<FileProcessResult> {
        const reader = new FileReader();

        return new Observable<FileProcessResult>((subject) => {
            reader.onload  = () => {
                subject.next(this.createGpxMap(reader.result as string));
                subject.complete();
            };
            reader.onerror = subject.error;
            reader.readAsText(uploadedFile);
        });
    }

    private createMap(id?: string): HTMLDivElement {
        const map          = document.createElement("div");
        map.style.position = "relative";
        map.style.width    = "100%";
        map.style.height   = "100%";

        if (id) {
            map.setAttribute("id", id);
        }

        const mapWrapper          = document.createElement("div");
        mapWrapper.style.position = "relative";
        mapWrapper.style.width    = "100%";
        mapWrapper.style.height   = "100%";
        mapWrapper.append(map);

        return mapWrapper;
    }

    private createGpxMap(content: string, id = "MAP_ID"): FileProcessResult {
        const mapElement = this.createMap(id);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(content, "text/xml");

        mapboxgl.accessToken = "pk.eyJ1IjoiZzQzcmlrbyIsImEiOiJjam14dGNreDcxYjBqM3ZvMjk1MDNhcnhkIn0.b6BmzCbtHQNg6hfRA4uzWQ";


        const tracks = Array.from(xmlDoc.querySelectorAll("trk")).map((trackElement) => {
            return {
                name    : trackElement.querySelector("name")?.textContent,
                time    : trackElement.querySelector("time")?.textContent,
                segments: Array.from(trackElement.querySelectorAll("trkseg")).map((segmentElement) => {
                    let minLat   = Infinity;
                    let maxLat   = -Infinity;
                    let minLong  = Infinity;
                    let maxLong  = -Infinity;
                    let minEl    = Infinity;
                    let maxEl    = -Infinity;
                    const points = Array.from(segmentElement.querySelectorAll("trkpt")).map((pointElement) => {
                        const lat       = parseFloat(pointElement.getAttribute("lat") as string);
                        const long      = parseFloat(pointElement.getAttribute("lon") as string);
                        const elevation = parseFloat(pointElement.querySelector("ele")?.textContent || "0");
                        minLat          = Math.min(minLat, lat);
                        maxLat          = Math.max(maxLat, lat);
                        minLong         = Math.min(minLong, long);
                        maxLong         = Math.max(maxLong, long);
                        minEl           = Math.min(minEl, elevation);
                        maxEl           = Math.max(maxEl, elevation);

                        return {
                            lat, long, elevation,
                            time: pointElement.querySelector("time")?.textContent as string,
                        };
                    });

                    const mapBoxPoints = points.map((point) => [point.long, point.lat]);
                    const line         = turf.lineString(mapBoxPoints);
                    const durationMs   = (new Date(points[points.length - 1].time).getTime() - new Date(points[0].time).getTime());

                    const durations = [];
                    const minute    = 1000 * 60;
                    const hour      = minute * 60;
                    if (durationMs > hour) {
                        durations.push(Math.floor(durationMs / hour) + "h");
                    }
                    if ((durationMs % hour) > minute) {
                        durations.push(Math.round((durationMs % hour) / minute) + "min");
                    }

                    return {
                        minEl, maxEl, points, mapBoxPoints,
                        duration: durations.join(" "),
                        length  : (turf.length(line, {units: "kilometers"}) as number).toFixed(2),
                        bounds  : [[minLong, minLat], [maxLong, maxLat]],
                    };
                })
            };
        });


        return {
            previewContent  : [mapElement],
            /**
             * TODO: distance, duration, elevation, minElevation, maxElevation
             */
            infos           : [
                {
                    key : "Map details",
                    type: "divider",
                },
                {
                    key  : "Points",
                    value: tracks[0].segments[0].points.length,
                },
                {
                    key  : "Distance",
                    value: tracks[0].segments[0].length + " km",
                },
                {
                    key  : "Duration",
                    value: tracks[0].segments[0].duration,
                },
                {
                    key  : "Elevation",
                    value: `min: ${tracks[0].segments[0].minEl}, max: ${tracks[0].segments[0].maxEl}`,
                },
                {
                    key  : "Name",
                    value: tracks[0].name || "Run",
                },
                {
                    key  : "Time",
                    value: tracks[0].time || "Unknown",
                },
            ],
            afterAddCallback: () => {
                const map = new mapboxgl.Map({
                    container       : id,
                    style           : "mapbox://styles/mapbox/streets-v11", // stylesheet location
                    bounds          : tracks[0].segments[0].bounds,
                    fitBoundsOptions: {
                        padding: 10,
                    }
                });

                map.on("load", () => {
                    map.addSource("route", {
                        type: "geojson",
                        data: {
                            type      : "Feature",
                            properties: {},
                            geometry  : {
                                type       : "LineString",
                                coordinates: tracks[0].segments[0].mapBoxPoints,
                            }
                        }
                    });
                    map.addLayer({
                        id    : "route",
                        type  : "line",
                        source: "route",
                        layout: {
                            "line-join": "round",
                            "line-cap" : "round"
                        },
                        paint : {
                            "line-color": "#888",
                            "line-width": 8
                        },
                    });
                });
            }
        };
    }
}

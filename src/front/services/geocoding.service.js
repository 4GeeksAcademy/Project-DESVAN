// OpenStreetMap 

export const getCoordinates = async (address, city) => {
    const query = encodeURIComponent(`${address}, ${city}`);
    const example = "Gran Vía 28, Madrid";
    const params = new URLSearchParams({
        format: "json",
        q: example, 
        limit:1,
        adressdetails:1
    });
    const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`
    );

    const data = await resp.json();
    console.log(data)
    if (!data.length) {
        throw new Error("No se pudieron obtener coordenadas");
    }

    return {
        lat: data[0].lat,
        lon: data[0].lon,
    };
};
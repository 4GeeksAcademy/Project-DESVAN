const url = import.meta.env.VITE_BACKEND_URL;

const createEvent = async (eventData) => {
    const resp = await fetch(url + "api/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + localStorage.getItem('token'),
},
        body: JSON.stringify(eventData),
    });

    if (!resp.ok) throw new Error("Error creating event");

    const data = await resp.json();

    return data;
};

export default createEvent;
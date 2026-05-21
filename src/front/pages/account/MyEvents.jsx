import { useState, useEffect } from "react";
import { AccountPageHeader } from "../../components/account/AccountPageHeader";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import eventService from "../../services/event.service";
import authService from "../../services/auth.service";

const TABS = ["TODOS", "ACTIVOS", "BORRADORES", "FINALIZADOS"];

const ACTION_ICONS = {
	edit: "fa-solid fa-pen",
	duplicate: "fa-regular fa-copy",
	delete: "fa-solid fa-trash",
};

const STATUS_MAP = {
	active: "ACTIVO",
	finished: "FINALIZADO",
	cancelled: "CANCELADO",
	draft: "BORRADOR",
};

const STATUS_VARIANT_MAP = {
	active: "activo",
	finished: "finalizado",
	cancelled: "cancelado",
	draft: "borrador",
};

export const MyEvents = () => {
	const [activeTab, setActiveTab] = useState("TODOS");
	const [userEvents, setUserEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { store } = useGlobalReducer();

	useEffect(() => {
		const fetchUserEvents = async () => {
			try {
				setLoading(true);
				let currentUser = store.user;

				// Si no hay usuario en store pero sí hay token, obtener los datos del usuario
				if (!currentUser && localStorage.getItem("token")) {
					const userData = await authService.getMe();
					currentUser = userData;
				}

				if (!currentUser) {
					setError("Usuario no autenticado");
					return;
				}

				// Obtener eventos de la API
				const response = await eventService.getEvents();

				if (!response || !response.data || !Array.isArray(response.data)) {
					setError("No se pudieron cargar los eventos");
					setUserEvents([]);
					return;
				}

				const allEvents = response.data;

				// Filtrar solo los eventos creados por el usuario logueado
				const filtered = allEvents.filter(
					(event) => event.seller && event.seller.id === currentUser.id
				);
				setUserEvents(filtered);
				setError(null);
			} catch (err) {
				console.error("Error fetching user events:", err);
				setError("Error al cargar tus eventos");
				setUserEvents([]);
			} finally {
				setLoading(false);
			}
		};

		fetchUserEvents();
	}, [store.user]);

	// Función para filtrar eventos por tab
	const getFilteredEvents = () => {
		if (activeTab === "TODOS") return userEvents;

		return userEvents.filter((event) => {
			const eventStatus = STATUS_MAP[event.status];
			if (activeTab === "ACTIVOS") return eventStatus === "ACTIVO";
			if (activeTab === "FINALIZADOS") return eventStatus === "FINALIZADO";
			if (activeTab === "BORRADORES") return eventStatus === "BORRADOR";
			return false;
		});
	};

	const filteredEvents = getFilteredEvents();

	// Función auxiliar para formatear la fecha
	const formatDate = (dateString) => {
		if (!dateString) return "Por definir";
		const date = new Date(dateString);
		return date.toLocaleDateString("es-ES", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	};

	return (
		<div className="my-events-page">
			<AccountPageHeader
				title="Mis eventos creados"
				titleAccent="Mis"
				subtitle="Donde tus ideas cobran vida"
				mascotComment="Mascota de la página de mis eventos"
			/>

			<div className="account-tabs">
				{TABS.map((tab) => (
					<button
						key={tab}
						type="button"
						className={`account-tab${activeTab === tab ? " account-tab--active" : ""}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>

			<div className="events-table-card">
				{loading && <p>Cargando tus eventos...</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!loading && filteredEvents.length === 0 && (
					<p>No tienes eventos en esta categoría</p>
				)}
				{!loading && filteredEvents.length > 0 && (
					<table className="events-table">
						<thead>
							<tr>
								<th>Evento</th>
								<th>Estado</th>
								<th>Fecha</th>
								<th>Capacidad</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{filteredEvents.map((event) => (
								<tr key={event.id}>
									<td>
										<div className="events-table-event">
											{event.image_url ? (
												<img
													src={event.image_url}
													alt={event.title}
													className="events-table-thumb"
												/>
											) : (
												<div
													className="events-table-thumb account-img-placeholder"
													aria-hidden="true"
												>
													<i
														className="fa-regular fa-image"
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															height: "100%",
															color: "#b0a099",
														}}
													/>
												</div>
											)}
											<strong>{event.title}</strong>
										</div>
									</td>
									<td>
										<span
											className={`event-status-badge event-status-badge--${STATUS_VARIANT_MAP[event.status]}`}
										>
											{STATUS_MAP[event.status]}
										</span>
									</td>
									<td>{formatDate(event.start_date)}</td>
									<td>{event.max_capacity || "—"}</td>
									<td>
										<div className="events-table-actions">
											<button
												type="button"
												className="events-table-action-btn"
												aria-label="edit"
												title="Editar"
											>
												<i className={ACTION_ICONS["edit"]} />
											</button>
											<button
												type="button"
												className="events-table-action-btn"
												aria-label="delete"
												title="Eliminar"
											>
												<i className={ACTION_ICONS["delete"]} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

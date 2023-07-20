import React, {
	ChangeEvent,
	useRef,
	useState,
	useEffect,
	FormEvent,
} from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import slack from "../assets/icons/slack.svg";
import whatsapp from "../assets/icons/whatsapp-icon.svg";
import meet from "../assets/icons/google-meet.svg";
import validate from "../utils/validate";
import { FormData, ErrorformData } from "../utils/interfaces";

const Contact: React.FC = () => {
	const form = useRef<HTMLFormElement>(null);
	const [formData, setFormData] = useState<FormData>({
		user_name: "",
		user_email: "",
		message: "",
	});
	const [errors, setErrors] = useState<ErrorformData>({
		user_name: null,
		user_email: null,
		message: null,
	});
	const [isValid, setIsValid] = useState<boolean>(false);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const sendEmail = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (form.current && isValid) {
			emailjs
				.sendForm(
					"service_dhkyyrg",
					"template_nq45l9r",
					form.current,
					"leaVQ4vTzlWI2IXEx"
				)
				.then(
					(_result: EmailJSResponseStatus) => {
						setFormData({
							user_name: "",
							user_email: "",
							message: "",
						});
						setErrors({});
						alert("Mensaje enviado correctamente.");
					},
					(_error) => {
						alert("Ha ocurrido un error.");
					}
				);
		}
	};

	useEffect(() => {
		if (
			Object.keys(formData).some(
				(key) => formData[key as keyof FormData] !== ""
			)
		) {
			setErrors(validate(formData));
		}
	}, [formData]);

	useEffect(() => {
		setIsValid(Object.values(errors).every((error) => error === ""));
	}, [errors]);

	return (
		<div className="contact">
			<h2 id="contact">Contáctame</h2>
			<div className="contact-conteiner">
				<form ref={form} onSubmit={sendEmail} className="form">
					<div className="contact-form">
						<section className="contact-form-section">
							<label>Nombre</label>
							<input
								type="text"
								name="user_name"
								placeholder="Ingresa tu nombre"
								value={formData.user_name}
								onChange={handleChange}
							/>
							{errors.user_name ? (
								<span className="error-message">{errors.user_name}</span>
							) : (
								""
							)}
						</section>

						<section className="contact-form-section">
							<label>Email</label>
							<input
								type="email"
								name="user_email"
								placeholder="Ingresa tu email"
								value={formData.user_email}
								onChange={handleChange}
							/>
							{errors.user_email ? (
								<span className="error-message">{errors.user_email}</span>
							) : (
								""
							)}
						</section>

						<section className="contact-form-section-message">
							<label>Mensaje</label>
							<textarea
								name="message"
								placeholder="Escribe tu mensaje"
								maxLength={500}
								minLength={10}
								value={formData.message}
								onChange={handleChange}
							/>
							{errors.message ? (
								<span className="error-message">{errors.message}</span>
							) : (
								""
							)}
						</section>

						<section className="contact-form-section-btn">
							<button
								className={isValid ? "" : "disable"}
								type="submit"
								value="Send"
								disabled={!isValid}
							>
								Enviar
							</button>
						</section>
					</div>
				</form>

				<div className="contact-plus">
					<article className="contact-plus-info">
						<section>
							<h3>Chateá conmigo</h3>
							<div>
								<a href="https://bit.ly/Glutix" target="_blank">
									<img src={whatsapp} alt="whatsapp-icon" loading="lazy" />
									<p>WhatsApp</p>
								</a>

								<a
									href="https://join.slack.com/t/jobnetworkespacio/shared_invite/zt-1zi9y1xkk-DR~7ToWOn4LZ24KXGAoeGA
									U05H8KAN4BZ
									"
									target="_blank"
								>
									<img src={slack} alt="slack-icon" loading="lazy" />
									<p>Slack</p>
								</a>
							</div>
						</section>

						<section>
							<h3>Agenda una cita</h3>
							<div>
								<a href="https://bit.ly/Agenda-Ricardo" target="_blank">
									<img src={meet} alt="meet-icon" />
									<p>Meeting</p>
								</a>
							</div>
						</section>
					</article>
				</div>
			</div>
		</div>
	);
};

export default Contact;

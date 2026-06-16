import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../component/TitleHeader";
import ContactExperience from "../component/models/contact/ContactExperience";

const emailjsConfig = {
    serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    publicKey:
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY ||
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID,
};

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (status.message) {
            setStatus({ type: "", message: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
            setStatus({
                type: "error",
                message: "Message service is missing configuration. Please try again later.",
            });
            return;
        }

        setLoading(true);

        try {
            await emailjs.sendForm(
                emailjsConfig.serviceId,
                emailjsConfig.templateId,
                formRef.current,
                emailjsConfig.publicKey
            );

            setForm({ name: "", email: "", message: "" });
            setStatus({
                type: "success",
                message: "Thanks! Your message has been sent successfully.",
            });
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus({
                type: "error",
                message: "Sorry, your message could not be sent. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get in Touch – Let’s Connect"
                    sub="💬 Have questions or ideas? Let’s talk! 🚀"
                />
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-10">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                <div>
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What’s your good name?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What’s your email address?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={loading}>
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {loading ? "Sending..." : "Send Message"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <img src="/images/arrow-down.svg" alt="arrow" />
                                        </div>
                                    </div>
                                </button>

                                {status.message && (
                                    <p
                                        className={`rounded-md px-4 py-3 text-sm ${
                                            status.type === "success"
                                                ? "bg-green-500/10 text-green-300"
                                                : "bg-red-500/10 text-red-300"
                                        }`}
                                        role={status.type === "error" ? "alert" : "status"}
                                        aria-live="polite"
                                    >
                                        {status.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-96">
                        <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

"use client";
import React from "react";

function MainComponent() {
  const features = [
    {
      key: "feature-1",
      title: "Access via Discord",
      description: "Quick and easy access through your Discord account.",
      icon: "fab fa-discord",
    },
    {
      key: "feature-2",
      title: "Keep Connected Across Communities",
      description:
        "Maintain connections with all your communities from a single platform.",
      icon: "fa fa-people-arrows",
    },
    {
      key: "feature-3",
      title: "The World in Real Time",
      description:
        "Experience global events as they unfold in real-time within your server.",
      icon: "fa fa-globe-americas",
    },
  ];

  const navLinks = [
    { href: "#hero", title: "Launch" },
    { href: "#features", title: "Platform Features" },
    { href: "#integration", title: "Integration" },
    { href: "#cta", title: "Invite" },
  ];

  const launchDate = new Date("2024-09-01T00:00:00");
  const [timeLeft, setTimeLeft] = React.useState({
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  });
  const [animate, setAnimate] = React.useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = launchDate - now;

      const newTimeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };

      setAnimate({
        days: newTimeLeft.days !== timeLeft.days,
        hours: newTimeLeft.hours !== timeLeft.hours,
        minutes: newTimeLeft.minutes !== timeLeft.minutes,
        seconds: newTimeLeft.seconds !== timeLeft.seconds,
      });

      setTimeLeft(newTimeLeft);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const countdownAnimationClasses = (unit) => {
    return animate[unit] ? "animate-number-flip" : "";
  };

  const CountdownTime = ({ time, label, animationClass }) => (
    <div className="flex flex-col items-center justify-center">
      <span className={`text-5xl md:text-6xl font-bold ${animationClass}`}>
        {time}
      </span>
      <span>{label}</span>
    </div>
  );

  let menuClasses = `fixed inset-0 bg-gradient-to-t from-black to-gray-800 z-50 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  }`;

  const headerHeight = "256px";
  const bottomSpacing = "mb-4";

  const Modal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#1d1f21] p-6 rounded-lg shadow-xl transform transition-all duration-500 ease-in-out scale-95">
        <h4 className="font-bold text-lg mb-3 text-white">Coming Soon!</h4>
        <p className="text-gray-400">
          We're working hard to bring you Verbatim. Stay tuned for updates!
        </p>
        <button
          onClick={closeModal}
          className="bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWec7J7hQHfk5Y6A7joxTCcQbSTH6lR3T9tM6i5MvRbRB9u8JLjVDN2fW3Jv"
          crossOrigin="anonymous"
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#030303] to-[#121212] text-white font-roboto">
      <header className="py-8 px-6 md:px-12 border-b border-gray-700 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold">Verbatim</h1>
          </div>
          <nav className="space-x-6 text-lg hidden md:block">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  (link.href === "#cta" ? openModal : () => {})();
                }}
                className={`py-2 px-6 transition-all hover:text-gray-300 ${
                  link.href === "#cta"
                    ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    : ""
                }`}
              >
                {link.title}
              </a>
            ))}
          </nav>
          <button onClick={toggleMenu} className="md:hidden text-lg">
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
        <div className={menuClasses}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                toggleMenu();
                if (link.href === "#cta") {
                  openModal();
                }
              }}
              className={`py-8 text-3xl font-semibold transition-all hover:text-gray-300 mb-4 ${
                link.href === "#cta"
                  ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  : ""
              }`}
            >
              {link.title}
            </a>
          ))}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </header>
      <main className="flex-grow">
        <section
          id="hero"
          className="relative text-center flex flex-col justify-between min-h-[calc(100vh_-_256px)] bg-gradient-to-b from-[#1d1f21] to-[#161719] p-8 md:p-20"
        >
          <div className="flex-1"></div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Empowering Conversations
            </h2>
            <p className="mb-8 text-lg md:text-xl">
              Unlock a new era of social interactions with Verbatim. Connect and
              collaborate like never before.
            </p>
            <button
              onClick={openModal}
              className="bg-[#5865F2] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[#4752c4] transition-colors mb-8"
            >
              Join the Beta
            </button>
            <div className={bottomSpacing}>
              <div className="text-center mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <CountdownTime
                  time={timeLeft.days}
                  label="Days"
                  animationClass={countdownAnimationClasses("days")}
                />
                <CountdownTime
                  time={timeLeft.hours}
                  label="Hrs"
                  animationClass={countdownAnimationClasses("hours")}
                />
                <CountdownTime
                  time={timeLeft.minutes}
                  label="Mins"
                  animationClass={countdownAnimationClasses("minutes")}
                />
                <CountdownTime
                  time={timeLeft.seconds}
                  label="Secs"
                  animationClass={countdownAnimationClasses("seconds")}
                />
              </div>
              <span className="text-xs font-light">Until v1</span>
            </div>
          </div>
          <div className="flex-1"></div>
        </section>
        <section id="features" className="container mx-auto py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="bg-[#2a2e32] rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform flex flex-col items-center text-center"
              >
                <div className="p-6 md:p-8 flex-grow w-full">
                  <div className="text-[#5865F2] mb-4 text-4xl md:text-5xl flex justify-center">
                    <i className={`${feature.icon}`}></i>
                  </div>
                  <div className="mb-2 text-xl md:text-2xl font-bold text-white">
                    {feature.title}
                  </div>
                  <div className="text-gray-400">{feature.description}</div>
                </div>
                <div className="border-t-4 border-[#5865F2] w-full mt-auto"></div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="cta"
          className="bg-gradient-to-b from-[#5865F2] to-[#4752c4] text-white py-20 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Join the Revolution</h2>
          <p className="text-lg font-light mb-8">
            Be a part of the future and grow your community with Verbatim. Get
            early access now!
          </p>
          <button
            onClick={openModal}
            className="bg-white text-[#5865F2] font-semibold py-4 px-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Join the Beta
          </button>
        </section>
      </main>
      <footer className="bg-[#191a1c] pt-4 pb-12 text-white">
        <div className="container mx-auto px-6 md:grid md:grid-cols-3 md:gap-8">
          <div className="mb-8 md:mb-0 md:flex md:items-start">
            <div>
              <h3 className="font-bold text-xl mb-4">Verbatim</h3>
              <p className="font-light text-gray-400">
                Transform your digital conversations with cutting-edge social
                media integration.
              </p>
            </div>
          </div>
          <div className="mb-8 md:mb-0 md:flex md:items-start">
            <div>
              <h3 className="font-bold text-xl mb-4">Quick Links</h3>
              <ul className="font-light text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-gray-300"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:flex md:items-start">
            <div>
              <h3 className="font-bold text-xl mb-4">Connect With Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#5865F2]"
                    onClick={(event) => {
                      event.preventDefault();
                      openModal();
                    }}
                  >
                    <i className="fab fa-discord"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#1DA1F2]"
                    onClick={(event) => {
                      event.preventDefault();
                      openModal();
                    }}
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#E1306C]"
                    onClick={(event) => {
                      event.preventDefault();
                      openModal();
                    }}
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-400"
                    onClick={(event) => {
                      event.preventDefault();
                      openModal();
                    }}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center font-light">
          <p>
            &copy; {new Date().getFullYear()} Verbatim. All Rights Reserved.
          </p>
        </div>
      </footer>
      <Modal />
      <style jsx global>{`
        .animate-number-flip {
          animation: number-flip 0.7s cubic-bezier(0.19, 1, 0.22, 1) both;
        }

        @keyframes number-flip {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.8;
          }
        }

        .modal-enter {
          animation: modal-in 0.5s forwards;
        }

        @keyframes modal-in {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </>
  );
}

export default MainComponent;
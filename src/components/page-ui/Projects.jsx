import { useState, useEffect, useRef } from 'react';

const Projects = () => {
    const projectCard = "flex justify-center items-center rounded-lg shadow-lg transition-all duration-500 overflow-hidden";
    const image = "rounded-md max-sm:rounded-lg w-full h-full max-md:p-4 hover:scale-110 transition-all duration-500";

    const projectRefs = useRef([]);
    const [inView, setInView] = useState(Array(6).fill(false));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = projectRefs.current.indexOf(entry.target);
                    if (entry.isIntersecting && index !== -1) {
                        setInView((prev) => {
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        projectRefs.current.forEach((ref) => ref && observer.observe(ref));

        return () => {
            projectRefs.current.forEach((ref) => ref && observer.unobserve(ref));
        };
    }, []);

    return (
        <section id="projects" className="flex justify-center dark:bg-black bg-white dark:text-white font-poppins transition-all duration-500">
            <div className="md:container flex flex-col items-center">
                <h2 className="text-3xl text-[#cf1b1b] font-extrabold mb-10 text-center relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:-my-3 after:bg-[#cf1b1b] after:bottom-0 after:w-3/4">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 md:gap-14 w-full lg:pt-10 md:px-10">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => (projectRefs.current[index] = el)}
                            className={`${projectCard} ${inView[index] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <a href="https://github.com/belkhelfamehdi/Library-Management-WebApp" target="_blank" rel="noreferrer">
                                <img src="./images/projects/clinical.png" alt={`Project ${index + 1}`} className={image} />
                            </a>
                        </div>
                    ))}
                </div>
                <a href="https://drive.google.com/file/d/1o76Kd4YwOIrmPd3AGvLtEmhnMKRKT45G/view?usp=sharing" target="_blank" rel="noreferrer">
                    <button className="my-20 px-8 py-3 bg-[#cf1b1b] border border-[#cf1b1b] hover:bg-white hover:text-[#cf1b1b] text-white text-sm font-bold rounded-xl transition-all duration-150">
                        Download CV
                    </button>
                </a>
            </div>
        </section>
    );
};

export default Projects;

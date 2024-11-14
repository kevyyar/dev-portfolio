import Button from "./button";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center leading-tight md:text-7xl lg:text-8xl">
        Kevin Barreto
      </h1>
      <p className="text-center text-graphite leading-6 my-6 md:leading-relaxed md:my-12 md:text-xl lg:w-[calc(50%-20px)] lg:text-2xl lg:leading-relaxed">
        I&apos;m a front-end developer passionate about crafting pixel-perfect
        user experiences. Currently building responsive web applications with
        modern JavaScript frameworks and turning complex problems into elegant
        solutions.
      </p>
      <Button>Say hello!</Button>
    </section>
  );
};

export default Hero;

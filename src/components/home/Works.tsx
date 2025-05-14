import Steps from '../../data/step';

const Works = () => {
  return (
    <section className='py-16 md:py-24 bg-muted/30'>
      <div className='container px-4 md:px-6 mx-auto'>
        <div className='text-center mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>How It Works</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Experience the seamless journey from chaos to organized learning
            with our AI-powered platform.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto'>
          {Steps.map((item, index) => (
            <div
              key={index}
              className='relative animate-on-scroll opacity-0 translate-y-4 transition-all duration-700'
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connecting line */}
              {index < 2 && (
                <div className='hidden md:block absolute top-10 left-full w-full h-0.5 bg-border z-0 -translate-y-1/2' />
              )}

              <div className='relative z-10 flex flex-col items-center text-center'>
                <div className='w-20 h-20 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-4 border border-brand-100 dark:border-brand-800'>
                  <span className='text-xl font-semibold text-brand-600 dark:text-brand-400'>
                    {item.step}
                  </span>
                </div>
                <div className='w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-3 -mt-8 ml-8 border border-border'>
                  {item.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                <p className='text-muted-foreground'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

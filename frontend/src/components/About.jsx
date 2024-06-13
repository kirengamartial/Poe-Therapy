import React from 'react'

const About = () => {
  return (
    <section className='flex justify-center mb-10'>
      <div className="text-center w-9/12 mt-12">
        <h1 className="text-3xl mb-4 relative inline-block">About</h1>
        <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="w-3/4 lg:w-3/5 mb-8 mt-7">
            <video
              src='https://res.cloudinary.com/dusc2e4cc/video/upload/v1718290510/IMG_1753_vwde4x.mp4'
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <div className="w-full lg:w-2/3 lg:pl-8">
            <p className="text-sm leading-relaxed">
              Welcome to our studio, where every sound is crafted into an immersive experience. Step into a sanctuary of creativity, where sonic dreams are born and brought to life. Equipped with state-of-the-art technology and a team passionate about perfecting your vision, we offer an inspiring environment where every note, beat, and melody finds its true essence. Whether you're a seasoned professional or a budding artist, our studio is your canvas, awaiting your unique touch to create something truly extraordinary. Join us and let your music journey begin.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
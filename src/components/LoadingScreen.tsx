
import React from "react";

const LoadingScreen = () => {
  return (
    <div 
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background: '#EFEAE2',
        backgroundImage: 'url("/static/img/bg-whats.png")',
        fontFamily: "'Open Sans', sans-serif"
      }}
    >
      <main 
        className="flex justify-center items-center flex-col text-center"
        style={{
          maxWidth: '90%',
          gap: '32px',
          padding: '48px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 40px 0 rgba(0,0,0,.02)',
          color: '#444'
        }}
      >
        <img width="50" src="https://tintim.link/static/img/spin.gif" alt="Loading" />
        <div>
          <h3 style={{ marginBottom: '12px', color: '#008069' }}>
            Por favor, aguarde alguns segundos.
          </h3>
          <p>Estamos localizando um atendente disponível...</p>
        </div>
      </main>
    </div>
  );
};

export default LoadingScreen;

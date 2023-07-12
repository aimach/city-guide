import React from 'react';
import InteractiveMap from '../../components/interactiveMap/InteractiveMap';
import Card from '../../components/common/card/Card';
import Image from '../../assets/lapalettedugout.jpg';

const HomePage = () => {
   return (
      <div>
         <InteractiveMap />
         <Card title="Bibi resto" image={Image} />
      </div>
   );
};

export default HomePage;

import { Poi } from '../../utils/types';
import styles from './modalePOI.module.scss';

interface Props {
   poi: Poi;
}

const ModalePOI = ({}: Props) => {
   return (
      <div className={styles.container}>
         {/* LEFT PART */}
         <div>
            <img />
            <div>
               <h3></h3>
               <div>
                  <i></i>
                  <i></i>
               </div>
               <button>Voir la carte</button>
            </div>
         </div>
         {/* RIGHT PART */}
         <div>
            <div>
               <h4>Adresse</h4>
               <p></p>
            </div>
            <div>
               <h4>Numéro de téléphone</h4>
               <p></p>
            </div>
            <div>
               <h4>Coordonnées GPS</h4>
               <p>Latitude :</p>
               <p>Longitude :</p>
            </div>
            <div>
               <h4>Description</h4>
               <p></p>
            </div>
         </div>
      </div>
   );
};

export default ModalePOI;

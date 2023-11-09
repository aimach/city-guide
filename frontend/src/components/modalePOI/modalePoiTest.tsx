import React, { useContext } from 'react';
import { Poi } from '../../utils/types';
import { AiOutlineClose } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { UsersContext } from '../../contexts/UserContext';

import styles from './modalePoiTest.module.scss';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
   poi: Poi;
   onClose: () => void;
   handleFavourite: (id: string | null) => void;
   isLiked: (id: string | null) => boolean;
   modaleOpen: boolean;
}

const ModalePoiTest = ({
   poi,
   onClose,
   handleFavourite,
   isLiked,
   modaleOpen,
}: Props) => {
   const { id, name, image, address, description, coordinates } = poi;
   const { isAuthenticated } = useContext(UsersContext);
   const navigate = useNavigate();
   return (
      <div className={`${styles.container} ${modaleOpen ? styles.open : ''}`}>
         <div className={styles.close} onClick={onClose}>
            <AiOutlineClose />
         </div>

         {/* LEFT PART */}
         <div className={styles.leftContainer}>
            <div className={styles.imageContainer}>
               <img src={image} alt={image} />
            </div>
            <div className={styles.header}>
               <h3>{name}</h3>
               {isAuthenticated() ? (
                  <div className={styles.icons}>
                     <FaShareAlt className={styles.socialIcon} />
                     <div onClick={() => handleFavourite(id)}>
                        {isLiked(id) ? (
                           <IoIosHeart
                              className={styles.filledHeart}
                              stroke="black"
                              strokeWidth={22}
                           />
                        ) : (
                           <IoIosHeartEmpty className={styles.emptyHeart} />
                        )}
                     </div>
                  </div>
               ) : null}
            </div>
            <div className={styles.buttonContainer}>
               <button className={styles.mapButton}>
                  <FontAwesomeIcon
                     icon={faLocationDot}
                     className={styles.icon}
                  />
                  Voir sur la carte
               </button>
            </div>
         </div>

         {/* RIGHT PART */}
         <div
            className={`${styles.rightContainer} ${
               !isAuthenticated() ? styles.center : ''
            }`}
         >
            {isAuthenticated() ? (
               <>
                  <div>
                     <h4>Adresse</h4>
                     <p>{address}</p>
                  </div>
                  <div>
                     <h4>Numéro de téléphone</h4>
                     <p></p>
                  </div>
                  <div>
                     <h4>Coordonnées GPS</h4>
                     <p>Latitude : {coordinates.coordinates[0]}</p>
                     <p>Longitude : {coordinates.coordinates[1]}</p>
                  </div>
                  <div>
                     <h4>Description</h4>
                     <p>{description}</p>
                  </div>
               </>
            ) : (
               <>
                  <p>
                     Vous devez être connecté pour voir les détails du point
                     d’intérêt.
                  </p>
                  <Link to="http://localhost:3000/auth/login">
                     <button className={styles.loginButton}>Connexion</button>
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default ModalePoiTest;

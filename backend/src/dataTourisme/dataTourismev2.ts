import axios from "axios";
import dataSource from "../seedDataSource";
import { Poi } from "../entities/Poi";

// 1 ) Endpoint API DATA_TOURISME
const apiUrl = "http://localhost:8081/";
// 2 ) TYPE POI à envoyer en base de donnée.
type FormattedPoi = {
  name: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  phoneNumber: number;
  description: string;
  is_accepted: boolean;
};

async function loadDataPoi(
  // from: number = 0,
  size: number = 10
): Promise<FormattedPoi[]> {
  const graphqlQuery = `
query getAllPOI	 {
  poi(size: ${size}) {
    total
    results {
      _uri                 
      rdf_type              
      dc_identifier         
      rdf_type
      hasDescription {
        shortDescription {
          value              
          lang
        }
      }
      isLocatedAt {
        schema_geo {
          schema_latitude   
          schema_longitude  
        }
        schema_address {
          schema_addressLocality
          schema_postalCode
          schema_streetAddress
        }
      }
      rdfs_label {
        value        
        lang
      }
      rdfs_comment {
        value
        lang
      }
      hasMainRepresentation {
        _uri
      }
      
      hasRepresentation {
        ebucore_hasRelatedResource {
          ebucore_locator
        }
      }
    }
  }
}
`;

  const response = await axios({
    url: apiUrl,
    method: "post",
    data: {
      operationName: "getAllPOI",
      query: graphqlQuery,
    },
  });

  // Création d'un POI vide à remplir avec les données récupérés sur l'api data tourisme
  const formattedPoi: FormattedPoi[] = [];

  for (const responseAPI of response.data.data.poi.results) {
    // GPS COORDINATES
    const latitude: number =
      responseAPI.isLocatedAt[0].schema_geo[0].schema_latitude[0];
    const longitude: number =
      responseAPI.isLocatedAt[0].schema_geo[0].schema_longitude[0];
    const coordinatesPOI = { latitude, longitude };

    // NAME POI
    const namePOI = responseAPI.rdfs_label[0].value;
    // ADDRESS POI
    const addressPOI =
      responseAPI.isLocatedAt[0].schema_address[0].schema_streetAddress +
      ", " +
      responseAPI.isLocatedAt[0].schema_address[0].schema_addressLocality +
      ", " +
      responseAPI.isLocatedAt[0].schema_address[0].schema_postalCode;

    // DESCRIPTION POI
    const descriptionPOI =
      responseAPI.rdfs_comment.length > 0
        ? responseAPI.rdfs_comment[0].value
        : "Non renseignée";
    // IMAGE POI

    //  const imagePOI = {
    //   responseAPI.hasRepresentation
    //  }

    // On pousse tout les éléments récupérés sur l'API data tourisme dans notre tableau
    formattedPoi.push({
      name: namePOI,
      address: addressPOI,
      description: descriptionPOI,
      coordinates: coordinatesPOI,
      // image: "https://picsum.photos/200/300",
      image: "https://picsum.photos/200/300",
      phoneNumber: 0,
      is_accepted: false,
    });
  }
  console.log(formattedPoi);

  return formattedPoi;
}

async function seedDatabaseWithPoi(formattedPoi: FormattedPoi[]) {
  await dataSource.initialize();
  for (const poi of formattedPoi) {
    const poiInDatabase = new Poi();
    poiInDatabase.name = poi.name;
    poiInDatabase.description = poi.description;
    poiInDatabase.address = poi.address;

    poiInDatabase.coordinates = {
      type: "Point",
      coordinates: [poi.coordinates.latitude, poi.coordinates.longitude],
    };

    poiInDatabase.image = poi.image;
    poiInDatabase.isAccepted = poi.is_accepted;

    await dataSource.manager.save(poiInDatabase);
  }
}

async function launchProcess() {
  // let step = 0;
  // const totalNumberOfPois = 82156;
  const totalPoi: FormattedPoi[] = [];
  // let numberOfFetchedPois = 0;
  // while (true) {
  const formattedPoi: FormattedPoi[] = await loadDataPoi();
  //   if (formattedPoi.length === 0) {
  //     break;
  //   }
  //   const poiWithImage = formattedPoi.find((poi) => poi.image !== "");
  //   if (poiWithImage) {
  //     console.log(JSON.stringify(poiWithImage, null, 2));
  //     break;
  //   }
  totalPoi.push(...formattedPoi);
  //   step += 1;
  //   numberOfFetchedPois += formattedPoi.length;
  //   console.log(numberOfFetchedPois, "/", totalNumberOfPois);
  // }

  await seedDatabaseWithPoi(totalPoi);
}
launchProcess();

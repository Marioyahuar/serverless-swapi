const mapAttributeNames = (data) => {
  const mappedData = {
    nombre: data.name,
    anio_nacimiento: data.birth_year,
    color_ojos: data.eye_color,
    peliculas: data.films,
    genero: data.gender,
    color_cabello: data.hair_color,
    altura: data.height,
    planeta_origen: data.homeworld,
    masa: data.mass,
    color_piel: data.skin_color,
    creado: data.created,
    editado: data.edited,
    especies: data.species,
    naves_estelares: data.starships,
    url: data.url,
    vehiculos: data.vehicles,
  };

  return mappedData;
};

module.exports = { mapAttributeNames };

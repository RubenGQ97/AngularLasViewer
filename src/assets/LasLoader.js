import {LASLoader} from '@loaders.gl/las';
import {load} from '@loaders.gl/core';


const LAS_URL = '/assets/pequeño.las';



export default async function LasLoader() {
  const response = await fetch(LAS_URL)
  const buffer=response.arrayBuffer()
  const data = await load(buffer,LASLoader);
  return data.attributes.POSITION.value;
}



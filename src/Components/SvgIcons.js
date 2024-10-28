import * as React from 'react';
import {SvgFromXml} from 'react-native-svg';
import { Color } from '../assets/Utils';

export default ({width, height, xml,color}) => (
  <SvgFromXml color={Color.black} width={width} height={height}  xml={xml}/>
);

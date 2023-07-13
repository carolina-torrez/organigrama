import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodoOrganigrama, NodoOrganigramaDocument } from './schema/organigrama.schema';

@Injectable()
export class SVGOrganigramaService {
  constructor() {}

//FALTA SCROLL
  async convertirASVG(nodos) {
    const nodeWidth = 150;
    const nodeHeight = 60;
    const horizontalSpacing = 100;
    const verticalSpacing = 100;
  
    let startX = 50;
    let startY = 300;
  
    let contenido = await this.generarNodoSVG(nodos, startX, startY, nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing);
  
    const totalWidth = contenido.maxWidth + startX +100;
    const totalHeight = contenido.maxHeight + startY + 100;
  
    const svgWidth = Math.max(totalWidth, (totalWidth*contenido.maxWidth)/2);
    const svgHeight = Math.max(totalHeight, 500);
  
    const translateX = Math.max(svgWidth - totalWidth, 0) / 2;
    const translateY = Math.max(svgHeight - totalHeight, 0) / 2;
  
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <g transform="translate(${translateX}, ${translateY})">
        ${contenido.svg}
      </g>
    </svg>`;
  
    return svg;
  }
  
  async generarNodoSVG(nodos, x, y, nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing) {
    const rectPadding = 10;
    const textPadding = 5;
  
    let svg = "";
    let maxWidth = 0;
    let maxHeight = 0;
  
    for (let i = 0; i < nodos.length; i++) {
      const nodo = nodos[i];
      const rectX = x - nodeWidth / 2;
      const rectY = y - nodeHeight / 2;
  
      let nodeContent = `<rect x="${rectX}" y="${rectY}" width="${nodeWidth}" height="${nodeHeight}" rx="5" ry="5" fill="#f2f2f2" stroke="#666666" stroke-width="1" />`;
      nodeContent += `<text x="${x}" y="${y + textPadding}" text-anchor="middle" font-family="Arial" font-size="12">${nodo.name}</text>`;
  
      svg += nodeContent;
  
      if (nodo.children && nodo.children.length > 0) {
        const childY = y + nodeHeight / 2 + rectPadding + verticalSpacing;
  
        for (let j = 0; j < nodo.children.length; j++) {
          const child = nodo.children[j];
          const childX = x + (j - (nodo.children.length - 1) / 2) * (nodeWidth + horizontalSpacing);
  
          const { svg: childSvg, maxWidth: childMaxWidth, maxHeight: childMaxHeight } = await this.generarNodoSVG([child], childX, childY, nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing);
          svg += childSvg;
  
          maxWidth = Math.max(maxWidth, childMaxWidth);
          maxHeight = Math.max(maxHeight, childMaxHeight);
  
          svg += `<line x1="${x}" y1="${y + nodeHeight / 2}" x2="${childX}" y2="${childY - nodeHeight / 2}" stroke="#666666" stroke-width="1" />`;
        }
  
        maxHeight += nodeHeight + verticalSpacing;
      }
  
      maxWidth = Math.max(maxWidth, nodeWidth);
      y += maxHeight;
    }
  
    return { svg, maxWidth, maxHeight };
  }

}
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import LasLoader from 'src/assets/LasLoader.js'
import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [`./viewer.component.css`]
})
export class ViewerComponent implements OnInit, AfterViewInit {
  
  @ViewChild('canvas') 
  private canvasRef: ElementRef;
  
  public x:any

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }



  private pointMaterial = new THREE.PointsMaterial({ size: 0.5, color: 'green' });
  private pointGeometry = new THREE.BufferGeometry();

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private data = new Float32Array;
  private flyControls: FlyControls;


  private createScene() {
    
    //Creamos la escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    
    
    //Creamos y configuramos la camara
    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.set(0,0,10);

    //configuramos los controles
    this.flyControls = new FlyControls(this.camera, this.canvas);
    this.flyControls.movementSpeed = 5



    //Incorporamos los puntos a la geometria y creamos un objeto POINTS que contenga esa geometria con el color/material que queramos
    this.pointGeometry.setAttribute('position', new THREE.BufferAttribute(this.data, 3));
    const points = new THREE.Points(this.pointGeometry, this.pointMaterial);
    console.log("PUNTOOOS\n",points)

    //añadimos la nube de puntos a la escena
    this.scene.add(points);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }


  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    
    let component: ViewerComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }());
  }



  constructor() {

  }

  async ngOnInit(){
    this.data = await LasLoader()
    this.createScene();
  }

  async ngAfterViewInit() {
    await LasLoader()
    await this.ngOnInit()
    this.startRenderingLoop();
    this.camera.position.set(this.data[0],this.data[1],this.data[2]);
  }

 
}




/**
 * BlinkFilter
 */
export class BlinkFilter extends PIXI.Filter {
    static readonly FRAGMENT_SRC:string = `
        precision mediump float;

        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        vec4 vTextureCoordBuf;
        uniform float percent;
        uniform vec4 maxColor;

        vec4 interpolate(vec4 start, vec4 end, float progress) {
            return start + (end - start) * progress;
        }

        void main(){
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            gl_FragColor = interpolate(gl_FragColor, maxColor, percent) * gl_FragColor.a;
        }
    `;

    private _rgba:number;

    constructor(color:number = 0xFFFFFFFF) {
        super('', BlinkFilter.FRAGMENT_SRC);
        this.rgba = color;
    }

    public set rgba(value:number) {
        this._rgba = value;

        let r:number = (this._rgba & 0xFF000000) >>> (4*6);
        let g:number = (this._rgba & 0x00FF0000) >>> (4*4);
        let b:number = (this._rgba & 0x0000FF00) >>> (4*2);
        let a:number = (this._rgba & 0x000000FF);
        //debugger
        this.uniforms.maxColor = [r/255, g/255, b/255, a/255];
    }

    public get rgba():number {
        return this._rgba;
    }

    public set intencity(value:number) {
        this.uniforms.percent = value;
    }

    public get intencity():number {
        return this.uniforms.percent;
    }
}
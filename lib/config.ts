import { Runtime } from "@aws-cdk/aws-lambda";

export enum Environment {
    PRODUCTION='production',
    DEVELOPMENT='development'
}

export interface ConfigProps {
    /**
     * Create resources on the api gateway even when the directory is empty
     * @default true
     */
    createEmptyResources?: boolean;

    /**
     * The working directory
     * @default process.cwd()
     */
    workingDirectory?: string;

    /**
     * The directory that contains the root of the api tree
     * @default api
     */
    rootDirectory?: string;

    /**
     * The default lambda runtime
     * @default Runtime.NODEJS_12_X
     */
    defaultRuntime?: Runtime;

    /**
     * The default lambda handler
     * @default Runtime.NODEJS_12_X
     */
    defaultHandler?: string;

    /**
     * The directory where the lambda assets will be packaged
     * @default dist
     */
    assetDir?: string;

    /**
     * Enable debug mode (verbose logging)
     * @default false
     */
    debug?: boolean;

    /**
     * Include the root directory in the api paths
     * @default false
     */
    includeRoot?: boolean;

    /**
     * The environment
     * @default development
     */
    env?: Environment;
}

export class Config {
    public readonly createEmptyResources: boolean;
    public readonly workingDirectory: string;
    public readonly rootDirectory: string;
    public readonly defaultRuntime: Runtime;
    public readonly defaultHandler: string;
    public readonly assetDir: string;
    public readonly debug: boolean;
    public readonly includeRoot: boolean;
    public readonly env: Environment;

    constructor(props?: ConfigProps) {
        this.createEmptyResources = props?.createEmptyResources || true;
        this.workingDirectory = props?.workingDirectory || process.cwd();
        this.rootDirectory = props?.rootDirectory || 'api';
        this.defaultRuntime = props?.defaultRuntime || Runtime.NODEJS_12_X;
        this.defaultHandler = props?.defaultHandler || 'index.handler';
        this.assetDir = props?.assetDir || 'dist';
        this.debug = props?.debug || false;
        this.includeRoot = props?.includeRoot || false;
        this.env = props?.env || Environment.DEVELOPMENT;
    }
}

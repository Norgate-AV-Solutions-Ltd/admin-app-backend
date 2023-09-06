interface Service {
    create: (...args: any) => Promise<any>;
    read: (...args: any) => Promise<any>;
    update: (...args: any) => Promise<any>;
    delete: (...args: any) => Promise<any>;
}

export default Service;

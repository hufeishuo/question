import answer from './structs/answer';

import demoData from './demo-data';

const defaultData = demoData();

const STRUCTS = ['body', 'options', 'analysis'];


const body = (data, config) => {
    console.log(config)
    return data;
}
const options = (data) => {
    data.option_list = Array.isArray(data.option_list) ? data.option_list : [data.option_list];
    return data;
}

const analysis = (data) => {
    return data;
}

class App {
    constructor(config) {
        this.config = {
            beforeparse: [],
            parse: {
                body,
                options,
                ...answer,
                analysis
            },
            afterparse: []
        };
        this.parseCache = {}
    }
    handlers(data) {
        let handler = this.parseCache[data.struct];
        if (!handler) {
            let structs = STRUCTS;
            structs.forEach(struct => {
                handler = compose(handler, this.config.parse[String(struct)+(data.struct||'')])
            })
        }
        return handler;
    }

    on(stage, name, fn) {
        this.config[stage].push(fn);
    }

    run(data) {
        const handle = this.handlers(data);
        return handle(data, this.config);
    }
}

const q = new App();
q.on('beforeparse', 'body', (stage, data) => {
    console.log(stage, data);
})
let data = q.run(defaultData);
console.log(data);


function compose(fn1 = (data, config) => data, fn2) {
    return function (...args) {
        return fn1(fn2.apply(null, args))
    }
}

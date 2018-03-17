import {util} from './utils';

describe('jsonToUrlParams',()=>{
    let json:any;
    beforeEach(()=>{});
    it('test1 success',()=>{
        json={
            name:'xiaoming',
            id:'1234',
            file:'23456'
        };
        let res=util.jsonToUrlParams(json);
        expect(res).toBe('name=xiaoming&id=1234&file=23456');
    });
    it('test2 success',()=>{
        json={
            name:'xiaoming',
            id:['123','234','345'],
            file:'23456'
        };
        let res=util.jsonToUrlParams(json);
        expect(res).toBe('name=xiaoming&id=123&id=234&id=345&file=23456');
    });
    it('test3 fail',()=>{
        json=['xiaoming','123','234'];
        let res=util.jsonToUrlParams(json);
        expect(res).toBe('');
    });
});
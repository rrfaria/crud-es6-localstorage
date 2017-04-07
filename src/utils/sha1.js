export default class sha1{
    constructor(msg){
        this.msg= msg;
    }
    static rotate_left(n, s) {
        return ( n << s ) | (n >>> (32 - s));
    };
    // lsb_hex(val) {
    //     let str="";
    //     let i;
    //     let vh;
    //     let vl;
    //     for( i=0; i<=6; i+=2 ) {
    //         vh = (val>>>(i*4+4))&0x0f;
    //         vl = (val>>>(i*4))&0x0f;
    //         str += vh.toString(16) + vl.toString(16);
    //     }
    //     return str;
    // };
    static cvt_hex(val) {
        let str="";
        let i;
        let v;
        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };

    /**
     * @return {string}
     */
    static Utf8Encode(argString) {
        if (argString === null || typeof argString === 'undefined') {
            return ''
        }
        // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        let string = (argString + '');
        let utftext = '';
        let start;
        let end;
        let stringl;
        start = end = 0;
        stringl = string.length;
        for (let n = 0; n < stringl; n++) {
            let c1 = string.charCodeAt(n);
            let enc = null;
            if (c1 < 128) {
                end++
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                )
            } else if ((c1 & 0xF800) !== 0xD800) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            } else {
                // surrogate pairs
                if ((c1 & 0xFC00) !== 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n)
                }
                let c2 = string.charCodeAt(++n);
                if ((c2 & 0xFC00) !== 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end)
                }
                utftext += enc;
                start = end = n + 1
            }
        }
        if (end > start) {
            utftext += string.slice(start, stringl)
        }
        return utftext;
    };

    encode(){
        let blockstart;
        let i, j;
        let W = new Array(80);
        let H0 = 0x67452301;
        let H1 = 0xEFCDAB89;
        let H2 = 0x98BADCFE;
        let H3 = 0x10325476;
        let H4 = 0xC3D2E1F0;
        let A, B, C, D, E;
        let temp;
        let msg = sha1.Utf8Encode(this.msg);
        let msg_len = msg.length;
        let word_array = [];
        for( i=0; i<msg_len-3; i+=4 ) {
            j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
                msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
            word_array.push( j );
        }
        switch( msg_len % 4 ) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
                break;
            case 2:
                i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
                break;
            case 3:
                i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
                break;
        }
        word_array.push( i );
        while( (word_array.length % 16) !== 14 ) word_array.push( 0 );
        word_array.push( msg_len>>>29 );
        word_array.push( (msg_len<<3)&0x0ffffffff );
        for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
            for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
            for( i=16; i<=79; i++ ) W[i] = sha1.rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
            for( i= 0; i<=19; i++ ) {
                temp = (sha1.rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = sha1.rotate_left(B,30);
                B = A;
                A = temp;
            }
            for( i=20; i<=39; i++ ) {
                temp = (sha1.rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = sha1.rotate_left(B,30);
                B = A;
                A = temp;
            }
            for( i=40; i<=59; i++ ) {
                temp = (sha1.rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = sha1.rotate_left(B,30);
                B = A;
                A = temp;
            }
            for( i=60; i<=79; i++ ) {
                temp = (sha1.rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = sha1.rotate_left(B,30);
                B = A;
                A = temp;
            }
            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }
        temp = sha1.cvt_hex(H0) + sha1.cvt_hex(H1) + sha1.cvt_hex(H2) + sha1.cvt_hex(H3) + sha1.cvt_hex(H4);
        return temp.toLowerCase();
    }
}
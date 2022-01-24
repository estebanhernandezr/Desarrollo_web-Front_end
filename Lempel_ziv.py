from String import *
from Auxiliar_functions import *
from Reproducible_extension import *

def encode_s(Si, p, n, Ls):
    l = Si.length
    print(p-1)
    print(l-1)
    Si.print_string()
    s1 = radix_representation(p-1, alpha, math.ceil(math.log(n-Ls, alpha)))
    s2 = radix_representation(l-1, alpha, math.ceil(math.log(Ls, alpha)))
    s1.concatenate_string(s2)
    s1.concatenate_string(Si.substring(Si.length, Si.length))

    return s1


def encode(S, n, Ls):
    L = LinkedList(long = n - Ls)
    Z = L.to_string()
    for i in range(1, Z.length+1):
        Z.insert_at(i, 0)

    Bi = Z.deep_copy().to_string()
    Bi.concatenate_string(S.substring(1, Ls))

    Bi.print_string()

    h = Ls
    Sr = String()
    while h-Ls < S.length:
        l, p = reproducible_extension(Bi.substring(1, n-1), n-Ls)
        l = l + 1

        Si = Bi.substring(n-Ls+1, n-Ls+l)

        s = encode_s(Si, p, n, Ls)
        print("CODEWORD: ", end='')
        s.print_string()
        Sr.concatenate_string(s)
        
        if h+l <= S.length:
            Bi = Bi.substring(l+1, n)
            Bi.concatenate_string(S.substring(h+1, h+l))
        else:
            Bi = Bi.substring(l+1, n)
            Bi.concatenate_string(S.substring(h+1, S.length))
            Bi.concatenate_string(LinkedList(long=n-Bi.length))

        h = h + l

        Bi.print_string()
  
    return Sr.substring(2, Sr.length)


def decode_c(D, Ci, n, Ls):
    print("INPUT:  ", end='')
    D.print_string()

    lp = math.ceil(math.log(n-Ls, alpha)) 
    ll = math.ceil(math.log(Ls, alpha))

    Cp = Ci.substring(1, lp)
    Cl = Ci.substring(lp+1, lp+ll)

    p = radix_representation_inv(Cp.to_list(), alpha, n, Ls) + 1
    l = radix_representation_inv(Cl.to_list(), alpha, n, Ls) + 1

    for i in range(1, l):
        for j in range(1, n-Ls):
            D.insert_at(j, D.substring(j+1, j+1).to_list()[-1])
        D.insert_at(n-Ls, D.substring(p-1, p-1).to_list()[-1])
        D.print_string()

    for j in range(1, n-Ls):
        D.insert_at(j, D.substring(j+1, j+1).to_list()[-1])
    D.insert_at(n-Ls, Ci.substring(Ci.length, Ci.length).to_list()[-1])

    return (D, l)


def decode(C, n, Ls):
    Lc = math.ceil(math.log(n-Ls, alpha)) + math.ceil(math.log(Ls, alpha)) + 1
    print("Codeword length:", Lc)

    L = LinkedList(long = n - Ls)
    for i in range(1, L.length+1):
        L.insert_at(i, 0)

    D = L.to_string()
    D.print_string()

    len = 1
    R = String()
    while len < C.length:
        Ci = C.substring(len, len + Lc - 1)
        Ci.print_string()
        D, l = decode_c(D, Ci, n, Ls)
        print("DECODED: ", end='')
        D.print_string()
        print("--------------------------------------------------")
        print("(i,j):=", (D.length-l+1, D.length))
        R.concatenate_string(D.substring(D.length-l+1, D.length))
        len = len + Lc
    
    return R

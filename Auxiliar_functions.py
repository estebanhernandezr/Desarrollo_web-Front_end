from String import *
import numpy as np
import math


alpha = 3

def radix_representation(num, alpha, lon):
    cont = 0
    lst = []
    while num >= 0 and cont < lon:
        frac = int(num/alpha)
        resd = num - alpha*frac
        lst.append(resd)

        num = frac

        cont = cont + 1

    lst.reverse()
    s = String()
    s.from_list(lst)

    return s

def radix_representation_inv(lst, base, n, Ls):
    lst.reverse()
    decimal = 0
    for i in range(0,len(lst)):
        decimal = decimal + base**(i)*lst[i]

    return decimal

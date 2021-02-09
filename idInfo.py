'''
author: pufvsi
Date: 2021-02-09 09:16:01
LastEditors: pufvsi
LastEditTime: 2021-02-09 14:07:33
'''
import re
import json
from datetime import datetime as dt


class idInfo:
    def __init__(self, idNumber, basePath='idinfo/regionalismCode/regionalismCode_'):
        self.id = idNumber.strip()
        self.year = 2019
        self.basePath = basePath

    def getProvince(self):
        macthNumber = str(self.id[0:2])+'0000'
        province = 0
        year = self.year
        basePath = self.basePath
        while(not province and year >= 1980):
            path = basePath+str(year)+'.json'
            with open(path, 'r', encoding='utf-8') as f:
                code = json.load(f)
                province = code.get(macthNumber, 0)
            year = year - 1
        if province == 0:
            province = 'unmathed'
        return province

    def getCity(self):
        macthNumber = str(self.id[0:4])+'00'
        city = 0
        year = self.year
        basePath = self.basePath
        while(not city and year >= 1980):
            path = basePath+str(year)+'.json'
            with open(path, 'r', encoding='utf-8') as f:
                code = json.load(f)
                city = code.get(macthNumber, 0)
            year = year - 1
        if city == 0:
            city = 'unmatched'
        return city

    def getCounty(self):
        macthNumber = str(self.id[0:6])
        county = 0
        year = self.year
        basePath = self.basePath
        while(not county and year >= 1980):
            path = basePath+str(year)+'.json'
            with open(path, 'r', encoding='utf-8') as f:
                regionlismCodePath = basePath+str(year)+'.json'
                code = json.load(f)
                county = code.get(macthNumber, 0)
            year = year - 1
        if county == 0:
            county = 'unmatched'
        return county

    def getAge(self):
        return dt.now().year - int(self.id[6:10])

    def getSex(self):
        return '男' if int(self.id[16]) % 2 != 0 else '女'

    def getBirthDay(self):
        return self.id[6:14]

    def isLegal(self):
        checkNum = self.id[-1]
        coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        sum = 0
        for (e, n) in zip(list(self.id[:-1]), coefficient):
            sum = sum + int(e)*n
        remainder = sum % 11
        regex = {
            0: '1',
            1: '0',
            2: 'x',
            3: '9',
            4: '8',
            5: '7',
            6: '6',
            7: '5',
            8: '4',
            9: '3',
            10: '2'
        }
        return 1 if regex[remainder] == checkNum else 0


if __name__ == "__main__":
    print(idInfo('350104198603210047').isLegal())

<!--
 * @author: pufvsi
 * @Date: 2021-02-09 11:14:56
 * @LastEditors: pufvsi
 * @LastEditTime: 2021-02-09 14:11:12
-->
## 一个简单的提取 :cn: 身份证号码内含信息的工具

根据身份证号码提取该号码所在省（直辖市）、市、县（区）、生日、年龄以及进行合法性校验。

:fire: 省、市、区信息来自[民政部官网](http://www.mca.gov.cn/article/sj/xzqh/1980/)发布数据，优先匹配能匹配成功的最新数据。举两个例子：

:chestnut: **330481** 原为海宁县，现已变更为海宁市，行政区划代码未调整。则查询 330481 的结果为海宁市。

:chestnut: **330107** 原为半山区，现该区已并入拱墅区，行政区划代码已撤销。则查询 330107 的结果为半山区。

### :ramen: 使用方法

``` python 
from  idInfo import idInfo
idInfo(idNumber,basePath)
@params idNumber str: 省份证号码
@params basePath（可选） str: 地区代码文件共有地址，
        默认为：'idinfo/regionalismCode/regionalismCode_'
```

:no_good: 不要改动行政区划代码信息文件名中的数字，并将此数字作为文件名结尾 （ 如 `regionlismCode_2019` 中的 `2019`），
#### :smile: 获取区域信息

:point_right: 获取省（直辖市、特别行政区）名称

```Python
.getProvince()
```
返回对应省的中文名称 `str`。未匹配成功返回 `unmatched`

**eg:**
```python
idInfo('35################').getProvince()
# 福建省
```

:point_right: 获取市名称
```Python
.getCity()
```
返回对应市的中文名称 `str`。未匹配成功返回 `unmatched`

**eg:**
```python
idInfo('3501##############').getProvince()
# 福州市
```

:point_right: 获取区（县）名称
```Python
.getCounty()
```
返回对应市的中文名称 `str`。未匹配成功返回 `unmatched`

**eg:**
```python
idInfo('350104############').getCounty()
# 仓山区
```

#### :smile: 获取年龄信息
```Python
.getAge()
```

返回对应身份证号码匹配的年龄 `int`
**eg:**
```python
idInfo('35010419860321####').getCounty()
# 35
```

#### :smile: 获取性别信息
```Python
.getSex()
```

返回对应身份证号码匹配的性别 `str`
**eg:**
```python
idInfo('350104198603210047').getSex()
# 女
```

#### :smile: 获取生日信息
```Python
.getBirthDay()
```

返回对应身份证号码匹配的生日 `str`
**eg:**
```python
idInfo('350104198603210047').getSex()
# 19860321
```

#### :smile: 合法性检验
```Python
.isLegal()
```

检查对应身份证号码是否合法 `int`，返回 0 代表不合法，1 代表合法
**eg:**
```python
idInfo('350104198603210047').isLegal()
# 0
```

### :page_facing_up: TODO
- [ ] 异常处理




import csv
import jieba
from collections import Counter

with open('csquare_half.csv', 'r') as f:
	reader = csv.reader(f)
	file_list = list(reader)

# ['流水號', '大類別', 'From', '網址', 'created_time', 
# 'post_type', 'postID', 'post_message', 
# 'status_type', 'link', '轉貼標題(name)', 
# '留言數', '按讚數', '分享數', 'update_time']
# post_message = 7
# 轉貼標題(name) = 10
# comment_count = 11
# likes = 12
# share = 13

i=1
seg_list = []

while(i<len(file_list)):
	temp = list(jieba.cut(file_list[i][7], cut_all=False))
	seg_list += temp
	del temp[:]
	i+=1

result = Counter(seg_list)

l = []
for key,value in result.items():
	temp = [key,value]
	l.append(temp)
l.sort(key=lambda x: x[1])
l = l[::-1]
print(l)

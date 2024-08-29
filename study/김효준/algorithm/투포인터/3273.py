n = int(input())
lst = sorted(list(map(int, input().split())))
x = int(input())

start = 0
end = n-1
cnt = 0

while start!=end:
    if lst[start]+lst[end] == x:
        cnt += 1
        start += 1
    elif lst[start]+lst[end] > x:
        end -= 1
    elif lst[start] + lst[end] < x:
        start += 1

print(cnt)
N = int(input())
lst = sorted(list(map(int, input().split())))

min = 2000000000
x = 0
y = 0

start = 0
end = N-1

while start != end:
    if abs(lst[start] + lst[end]) <= abs(min):
        min = abs(lst[start] + lst[end])
        x = lst[start]
        y = lst[end]
    if lst[start] + lst[end] >= 0:
        end -= 1
    elif lst[start] + lst[end] < 0:
        start += 1

print(x, y)
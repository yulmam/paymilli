N, S = map(int, input().split())
lst = list(map(int, input().split()))

start = 0
end = 0

result = N+1 #일단 최대길이로 잡고

hap = 0

while start <= end < N:
    hap += lst[end]
    if hap >= S:
        if (end-start) < result:
            result = end-start +1
        hap -= lst[start]
        start += 1
        hap -= lst[end]

    else:
        end += 1
if result == N+1:
    print(0)
else:
    print(result)
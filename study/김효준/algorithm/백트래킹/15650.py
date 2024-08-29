def dfs():
    if len(s) == m:
        print(' '.join(map(str, s)))
        return
    for i in range(1, n + 1):
        if len(s)>0 and s[-1] >= i:
            continue
        if visited[i]:
            continue
        visited[i] = True
        s.append(i)
        dfs()
        s.pop()
        visited[i] = False


n, m = map(int, input().split())
s = []
visited = [False] * (n + 1)

dfs()
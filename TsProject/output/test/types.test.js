test("LinearEnum", () => {
    // { Count: number, [index: number]: string};
    let t = { Count: 1, 2: "Count" };
    expect(t.Count).toBe(1);
    expect(t[2]).toBe("Count");
});
export {};
//# sourceMappingURL=types.test.js.map
# Ruby 3.2+ removed Object#tainted? and related taint API.
# Liquid 4.0.3 (from github-pages) still calls .tainted? — this backport keeps it working.
if !Object.method_defined?(:tainted?)
  class Object
    def tainted?; false; end
    def taint; self; end
    def untaint; self; end
  end
end
